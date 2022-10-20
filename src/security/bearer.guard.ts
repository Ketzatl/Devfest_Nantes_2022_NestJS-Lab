import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';


// Quelques explications :
//
//     L'interface CanActivate permet d'activer ou non une route en fonction du résultat de la méthode canActivate
// On contrôle la présence d'un header authorization avec comme valeur attendue ' +
// 'celle saisie dans le fichier .env, récupérée grâce au service ConfigService.

@Injectable()
export class BearerGuard implements CanActivate {
  private readonly logger = new Logger(BearerGuard.name);

  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request?.headers?.authorization === `Bearer ${this.configService.get<string>('security.apiBearer')}`) {
      return true;
    }

    this.logger.warn(`An unauthorized call has been made on a API endpoint`);
    return false;
  }
}