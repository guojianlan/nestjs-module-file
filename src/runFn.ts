import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { IGuardStore } from './types';
@Injectable()
export class RunFnGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await GuardStore.inject(context);
  }
}

export const GuardStore: IGuardStore = {
  inject: async () => {
    return true;
  },
};
