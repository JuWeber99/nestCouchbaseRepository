import { Injectable } from '@nestjs/common';
import { Collection } from 'couchbase';
import { InjectRepository } from '../../src';
import { User } from './user.entity';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Collection) { }

  async get(id: string) {
    return this.repo.get(id)
  }
}
