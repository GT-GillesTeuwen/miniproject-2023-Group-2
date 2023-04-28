import os

# Get user input for library name
library_name = input("Enter library name: ")

# Run terminal commands
os.system(f"yarn nx generate @nrwl/js:library feature --unitTestRunner=jest --directory=api/{library_name} --no-interactive")
os.system(f"yarn nx generate @nrwl/js:library data-access --unitTestRunner=jest --directory=api/{library_name} --no-interactive")
os.system(f"yarn nx generate @nrwl/js:library util --unitTestRunner=jest --directory=api/{library_name} --no-interactive")

# Create folders
folders = [
    f'./api/{library_name}/feature/src/commands',
    f'./api/{library_name}/feature/src/events',
    f'./api/{library_name}/feature/src/models',
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)

# Create files
files = [
    f'./api/{library_name}/feature/src/{library_name}.saga.ts',
    f'./api/{library_name}/feature/src/{library_name}.module.ts',
    f'./api/{library_name}/feature/src/{library_name}.service.ts',
    f'./api/{library_name}/feature/src/models/{library_name}.model.ts',
]

for file in files:
    with open(file, 'w') as f:
        f.write('// Not implemented exception\n\n')

# Create index.ts files
index_files = [
    f'./api/{library_name}/feature/src/commands/index.ts',
    f'./api/{library_name}/feature/src/events/index.ts',
    f'./api/{library_name}/feature/src/models/index.ts',
    f'./api/{library_name}/data-access/src/index.ts'
]

index_code = f"""export * from './ExampleExampleExample.handler';  // replace and add with files from this directory"""


for index_file in index_files:
    with open(index_file, 'w') as f:
        f.write(index_code)
        f.close()


ind_file = open(f"./api/{library_name}/util/src/index.ts", "w")

index_code = f"""export * from './commands';
export * from './enums';
export * from './events';
export * from './interfaces';
export * from './requests';
export * from './responses';
"""
ind_file.write(index_code)
ind_file.close()

ind_file = open(f"./api/{library_name}/feature/src/index.ts", "w")

index_code = f"""export * from './{library_name}.module';
export * from './{library_name}.sagas';
export * from './{library_name}.service';
"""
ind_file.write(index_code)
ind_file.close()



# Create the .module.ts file
module_code = f"""
import {{ {library_name}Module as {library_name}DataAccessModule }} from '@mp/api/{library_name}/data-access'
import {{ Module }} from '@nestjs/common';
import {{ CqrsModule }} from '@nestjs/cqrs';
import {{ ExampleExampleExampleHandler }} from './commands';
import {{ ExampleExampleExampleHandler }} from './events';
import {{ {library_name}Sagas }} from './{library_name}.sagas';
import {{ {library_name}Service }} from './{library_name}.service';
export const CommandHandlers = [
  ExampleExampleExampleHandler,
];
export const EventHandlers = [
  ExampleExampleExampleHandler,
];

@Module({{
  imports: [CqrsModule, {library_name}DataAccessModule],
  providers: [
    {library_name}Service,
    ...CommandHandlers,
    ...EventHandlers,
    {library_name}Sagas,
  ],
  exports: [{library_name}Service],
}})
export class {library_name}Module {{}}
"""

module_file = open(f"./api/{library_name}/feature/src/{library_name}.module.ts", "w")
module_file.write(module_code)
module_file.close()

#create the .service.ts
service_code = f"""
import {{
    IExampleExampleExampleRequest,
    IRExampleExampleExampleResponse,
    ExampleExampleExampleCommand,
}} from '@mp/api/{library_name}/util';
import {{ Injectable }} from '@nestjs/common';
import {{ CommandBus }} from '@nestjs/cqrs';
import {{ NotImplementedException }} from '@nestjs/common';

@Injectable()
export class {library_name}Service {{
  //constructor(private readonly commandBus: CommandBus) {{}}     **correct line
  constructor() {{}} 

  async exampleExampleExample(
    request: IUpdatePrivacyDetailsRequest
  ): Promise<IUpdatePrivacyDetailsResponse> {{
    //CORRECT STUFF:
    // return await this.commandBus.execute<
    //   UpdatePrivacyDetailsCommand,
    //   IUpdatePrivacyDetailsResponse
    // >(new UpdatePrivacyDetailsCommand(request));
    //
    throw new NotImplementedException;
  }}
}}
"""

service_file = open(f"./api/{library_name}/feature/src/{library_name}.service.ts", "w")
service_file.write(service_code)
service_file.close()



# Create command file
command_code = f"""
import {{ NotImplementedException }} from '@nestjs/common';
 import {{ CommandHandler, ICommandHandler }} from '@nestjs/cqrs';
import {{ UpdateThemeDetailsCommand }} from '../events/update-theme-details.command';

@CommandHandler(ExampleExampleExampleCommand)
export class ExampleExampleExampleHandler implements ICommandHandler<UpdateThemeDetailsCommand> {{
  constructor() {{}}

  async execute(command: UpdateThemeDetailsCommand): Promise<void> {{
    throw new NotImplementedException
  }}
}}
"""

command_file = open(f"./api/{library_name}/feature/src/commands/example-example-example.handler.ts", "w")
command_file.write(command_code)
command_file.close()


#Create event file
event_code = f"""
import {{ EventsHandler, IEventHandler }} from '@nestjs/cqrs';
import {{ PrivacyDetailsUpdatedEvent }} from '../events/privacy-details-updated.event';

@EventsHandler(ExampleExampleExampleEvent)
class ExampleExampleExampleHandler implements IEventHandler<PrivacyDetailsUpdatedEvent> {{
  constructor() {{}}

  async handle(event: PrivacyDetailsUpdatedEvent): Promise<void> {{
    throw new Error('Method not implemented.');
  }}
}}
"""


event_file =  open(f"./api/{library_name}/feature/src/events/example-example-example.handler.ts", "w")
event_file.write(event_code)
event_file.close()

#create .model file in Model

model_code = f"""
import {{
    ExampleExampleExampleEvent,
    IPrivacyDetails,
    I{library_name},
}} from '@mp/api/{library_name}/util';
import {{ NotImplementedException }} from '@nestjs/common';
import {{ AggregateRoot }} from '@nestjs/cqrs';

export class {library_name} extends AggregateRoot implements I{library_name} {{
  constructor(
    public userId: string
    //need to add these
    //public privacyDetails?: IPrivacyDetails | null | undefined,
    //public created?: FirebaseFirestore.Timestamp | null | undefined
  ) {{
    super();
  }}

  static fromData({library_name}: I{library_name}): {library_name} {{
    const instance = new {library_name}(
      {library_name}.userId,
      //need to add these
      //{library_name}.privacyDetails,
      //{library_name}.created
    );
    return instance;
  }}

  exampleExampleExample(accountDetails: IPrivacyDetails) {{
    return NotImplementedException;
  }}
}}
"""


command_file = open(f"./api/{library_name}/feature/src/models/{library_name}.model.ts", "w")
command_file.write(model_code)
command_file.close()

# Util folder

folders = [
    f'./api/{library_name}/util/src/commands',
    f'./api/{library_name}/util/src/enums',
    f'./api/{library_name}/util/src/events',
    f'./api/{library_name}/util/src/interfaces',
    f'./api/{library_name}/util/src/requests',
    f'./api/{library_name}/util/src/responses'
]

for folder in folders:
    os.makedirs(folder, exist_ok=True)


# Create index.ts files
index_files = [
    f'./api/{library_name}/util/src/commands/index.ts',
    f'./api/{library_name}/util/src/events/index.ts',
    f'./api/{library_name}/util/src/enums/index.ts',
    f'./api/{library_name}/util/src/interfaces/index.ts',
    f'./api/{library_name}/util/src/requests/index.ts',
    f'./api/{library_name}/util/src/responses/index.ts'
]

index_code = f"""export * from './ExampleExampleExample.SubDirectory';  // replace and add with files from this directory"""


for index_file in index_files:
    with open(index_file, 'w') as f:
        f.write(index_code)
        f.close()



command_code = """import { IExampleExampleExampleRequest } from '../requests';
export class ExampleExampleExampleCommand {
  constructor(public readonly request: IExampleExampleExampleRequest) {}
}
"""

command_file = open(f"./api/{library_name}/util/src/commands/ExampleExampleExample.command.ts", "w")
command_file.write(command_code)
command_file.close()



enum_code = """export enum ExampleGroup {
  example_var = '18-25',
  example_var1 = '26-35',
  example_var2= '36-45',
  example_var3 = '46-55',
  example_var4 = '56-65',
  example_var5 = '65+',
}
"""

command_file = open(f"./api/{library_name}/util/src/enums/ExampleExampleExample.enum.ts", "w")
command_file.write(enum_code)
command_file.close()



event_code = """import { IExample } from '../interfaces';
export class ProfileCreatedEvent {
  constructor(public readonly profile: IProfile) {}
}
"""

command_file = open(f"./api/{library_name}/util/src/events/ExampleExampleExample.event.ts", "w")
command_file.write(event_code)
command_file.close()

interface_code = """import { ExampleGroup } from '../enums';
 export interface IExample {
  example?: ExampleGroup | null | undefined;
}
"""

command_file = open(f"./api/{library_name}/util/src/interfaces/ExampleExampleExample.interface.ts", "w")
command_file.write(interface_code)
command_file.close()

requests_code = """import { IExample } from '../interfaces';
export interface IExampleExampleExampleRequest {
  example: IExample;
}

"""

command_file = open(f"./api/{library_name}/util/src/requests/ExampleExampleExample.command.ts", "w")
command_file.write(requests_code)
command_file.close()

response_code = """import { IExample } from '../interfaces';
export interface IExampleExampleExampleResponse {
  example: IExample;
}
"""

command_file = open(f"./api/{library_name}/util/src/responses/ExampleExampleExample.command.ts", "w")
command_file.write(response_code)
command_file.close()


data_module_code = """import { Module } from '@nestjs/common';
import { Example.repository } from './example.repository';

@Module({
  providers: [ExampleRepository],
  exports: [ExampleRepository],
})
export class ExampleModule {}
"""


data_module = open(f"./api/{library_name}/data-access/src/example.module.ts", "w")
data_module.write(data_module_code)
data_module.close()

data_module_code = f"""import {{ IExample }} from '@mp/api/{library_name}/util';
import {{ Injectable }} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class ExampleRepository {{
  // async findOne(example: IExample) {{
  //   return await admin
  //     .firestore()
  //     .collection('example')
  //     .withConverter<IExample>({{
  //       fromFirestore: (snapshot) => {{
  //         return snapshot.data() as IExample;
  //       }},
  //       toFirestore: (it: IExample) => it,
  //     }})
  //     .doc(example.userId)
  //     .get();
  // }}

  async createProfile(example: IExample) {{
    // Remove password field if present
    delete example.exampleProperty?.exampleProperty;
    return await admin
      .firestore()
      .collection('example')
      .doc(example.userId)
      .create(example);
  }}
}}
"""


command_file = open(f"./api/{library_name}/data-access/src/example.repository.ts", "w")
command_file.write(data_module_code)
command_file.close()


saga_code = f"""import {{
    ExampleExampleExampleEvent,
    ExampleExampleExampleCommand
}} from '@mp/api/{library_name}/util';
import {{ UserCreatedEvent }} from '@mp/api/users/util';
import {{ Injectable }} from '@nestjs/common';
import {{ IExample, ofType, Saga }} from '@nestjs/cqrs';
import {{ map, Observable }} from 'rxjs';

@Injectable()
export class ExampleSagas {{
  @Saga()
  onUserCreated = (events$: Observable<any>): Observable<IExample> => {{
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        (event: UserCreatedEvent) =>
          new CreateProfileCommand({{ user: event.user }})
      )
    );
  }};

  
}}"""


command_file = open(f"./api/{library_name}/feature/src/{library_name}.saga.ts", "w")
command_file.write(saga_code)
command_file.close()


# I wan die now :)