import { create, getNumericDate } from "@djwt";
import { decodeBase64 } from "@std/encoding/base64";

export class GitHubApplication {
  private readonly decodedPrivateKey: Uint8Array;
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

  public async jwt(): Promise<string> {
    const key = await crypto.subtle.importKey(
      "pkcs8",
      this.decodedPrivateKey,
      {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" },
      },
      true,
      ["sign"],
    );

    return create(
      { alg: "RS256", typ: "JWT" },
      {
        iss: `${this.appId}`, // issuer
        iat: getNumericDate(0), // issued at time (now)
        exp: getNumericDate(5 * 60), // expiration time (in 5 minutes)
      },
      key,
    );
  }
}
