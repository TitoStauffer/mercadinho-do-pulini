import { Injectable } from '@angular/core';
import {UserModel} from "../admin/models/userModel";

@Injectable({
  providedIn: 'root'
})
export class WebAuthnService {

  constructor() { }

  // @ts-ignore
    webAuthnSignup(user: UserModel): Promise<CredentialType> {
    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
      challenge: Uint8Array.from('someChallengeIsHereComOn', c => c.charCodeAt(0)),
      rp: {
        name: 'WebAuthn Test',
      },
      user: {
        id: Uint8Array.from(String(user.id), c => c.charCodeAt(0)),
        name: user.name,
        displayName: user.name,
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      authenticatorSelection: {
        authenticatorAttachment: 'cross-platform',
        userVerification: 'discouraged'
      },
      timeout: 60000,
      attestation: 'none'
    };

    return navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    });
  }

  // @ts-ignore
    webAuthnSignin(user: UserModel): Promise<CredentialType> {
    const allowCredentials: PublicKeyCredentialDescriptor[] = user.credentials.map(c => {
      console.log(c.credentialId);
      return { type: 'public-key', id: Uint8Array.from(Object.values(c.credentialId)) };
    });

    console.log('allowCredentials', allowCredentials);

    const credentialRequestOptions: PublicKeyCredentialRequestOptions = {
      challenge: Uint8Array.from('someChallengeIsHereComOn', c => c.charCodeAt(0)),
      allowCredentials,
    };

    return navigator.credentials.get({
      publicKey: credentialRequestOptions,
    });
  }
}
