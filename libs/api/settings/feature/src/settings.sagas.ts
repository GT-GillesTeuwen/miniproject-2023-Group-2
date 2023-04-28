import { Injectable, NotImplementedException } from '@nestjs/common';
import { Saga } from '@nestjs/cqrs';

@Injectable()
export class ExampleSagas {
  @Saga()
  onFunction = () => {
    return new NotImplementedException
  };
  
}