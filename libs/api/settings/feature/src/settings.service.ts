import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { NotImplementedException } from '@nestjs/common';

@Injectable()
export class settingsService {
  //constructor(private readonly commandBus: CommandBus) {}     **correct line
  constructor() {} 

  async function() {
    throw new NotImplementedException;
  }
}
