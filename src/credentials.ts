import { create, getNumericDate } from "@djwt";
import { decodeBase64 } from "@std/encoding/base64";

/**
 * GitHubCredentialProvider is a provider of GitHub credentials.
 */
export type GitHubCredentialProvider = {
  token(): Promise<string>;
}

/**
 * GitHubCredentialConfig is the configuration for GitHub credentials.
 */
type GitHubCredentialConfig = {
  githubAppId?: number;
  githubPrivateKey?: string;
  githubPat?: string;
}

/**
 * credentials creates a new GitHubCredentialProvider.
 * @param config The configuration for the GitHub credentials.
 */
export function credentials(config: GitHubCredentialConfig): GitHubCredentialProvider {
  if (config.githubPat)
    return new GitHubPat(config.githubPat)

  if (config.githubAppId && config.githubPrivateKey)
    return new GitHubApplication(
      config.githubAppId,
      config.githubPrivateKey,
    );

  throw new Error("githubPat or githubAppId and githubPrivateKey required");
}

/**
 * GitHubPat is a GitHub Personal Access Token credential provider
 */
export class GitHubPat {
  constructor(
    private readonly pat: string,
  ) {
  }

  public async token(): Promise<string> {
    return await this.pat;
  }
}

/**
 * GitHubApplication is a GitHub Application credential provider
 */
export class GitHubApplication {
  private readonly decodedPrivateKey: Uint8Array;
  private key: CryptoKey | null = null;
  constructor(
    private readonly appId: number,
    private readonly pks8PrivateKey: string,
  ) {
    this.decodedPrivateKey = GitHubApplication.pemToBinary(this.pks8PrivateKey);
  }

  private static pemToBinary(pem: string): Uint8Array {
    const base64 = pem
      .replace(/-----[A-Z ]*-----/g, "")
      .replace(/\s+/g, "");
    return decodeBase64(base64);
  }

  public async token(): Promise<string> {
    if (!this.key) {
      this.key = await crypto.subtle.importKey(
        "pkcs8",
        this.decodedPrivateKey,
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: { name: "SHA-256" },
        },
        true,
        ["sign"],
      );
    }

    return create(
      { alg: "RS256", typ: "JWT" },
      {
        iss: `${this.appId}`, // issuer
        iat: getNumericDate(0), // issued at time (now)
        exp: getNumericDate(5 * 60), // expiration time (in 5 minutes)
      },
      this.key,
    );
  }
}
