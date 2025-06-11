/* eslint-disable camelcase, @typescript-eslint/naming-convention */

import { Injectable } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import {
  type KeycloakConnectOptions,
  type KeycloakConnectOptionsFactory,
} from 'nest-keycloak-connect';
import { keycloakConnectOptions } from '../../config/keycloak.js';
import { getLogger } from '../../logger/logger.js';

const { authServerUrl } = keycloakConnectOptions;

/** Typdefinition für Eingabedaten zu einem Token. */
export type TokenData = {
  readonly username: string | undefined;
  readonly password: string | undefined;
};

@Injectable()
export class KeycloakService implements KeycloakConnectOptionsFactory {
  readonly #keycloakClient: AxiosInstance;

  readonly #logger = getLogger(KeycloakService.name);

  constructor() {
    this.#keycloakClient = axios.create({
      baseURL: authServerUrl!,
      // ggf. httpsAgent fuer HTTPS bei selbst-signiertem Zertifikat
    });
    this.#logger.debug('keycloakClient=%o', this.#keycloakClient.defaults);
  }

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return keycloakConnectOptions;
  }

  async getToken(context: any) {
    const rawAuth = context.req?.headers?.authorization;

    if (typeof rawAuth !== 'string' || !rawAuth.startsWith('Bearer ')) {
      this.#logger.warn(
        'getToken: Kein gültiger Authorization-Header vorhanden',
      );
      return null;
    }

    const token = rawAuth.slice(7);

    const parts = (token as string).split('.');

    if (parts.length !== 3) {
      this.#logger.warn('getToken: Token hat kein gültiges JWT-Format');
      return null;
    }

    let payloadDecoded: string;
    try {
      payloadDecoded = Buffer.from(parts[1], 'base64').toString('utf-8');
    } catch (err) {
      this.#logger.error('getToken: Fehler beim Decodieren des Payloads', err);
      return null;
    }

    let payload: any;
    try {
      payload = JSON.parse(payloadDecoded);
    } catch (err) {
      this.#logger.error('getToken: Fehler beim Parsen des Payloads', err);
      return null;
    }

    const { exp, realm_access, preferred_username, email } = payload;
    const roles = realm_access?.roles ?? [];

    this.#logger.debug('getToken: exp=%s', exp);
    this.#logger.debug('getToken: roles=%o ', roles);

    return { username: preferred_username, email, roles, token };
  }
}
/* eslint-enable camelcase, @typescript-eslint/naming-convention */
