import { IocContract } from '@adonisjs/fold'
import Application from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected $container: IocContract) {
  }

  public register () {
    // Register your own bindings
  }

  public boot () {
    // IoC container is ready
  }

  public shutdown () {
    // Cleanup, since app is going down
  }

  public async ready () {
    // App is ready
    if (!Application.inProduction) {
      const Database = (await import('@ioc:Adonis/Lucid/Database')).default
      const Event = (await import('@ioc:Adonis/Core/Event')).default
      Event.on('db:query', Database.prettyPrint)
    }
  }
}
