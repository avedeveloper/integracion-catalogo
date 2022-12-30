import cron from 'node-cron'
import CronDB from '../../models/Crons.js'
export function cronJob(time, api) {
  try {
    cron.schedule(time, async () => {
      let time = new Date()
      var cron_db = new CronDB({ cronId: api.cronId, time, api: api.name })
      let res_fn = await api.fn()

      if (res_fn.error !== undefinde && res_fn.error !== null){
        cron_db.errors.push(res_fn.error)
      }
      cron_db.save()
    })
      .onError((err) => {
        console.log(err)
        let time = new Date()
        new CronDB({ cronId: api.cronId, time, api: api.name, errors: [JSON.stringify(err)] }).save()
      })
  } catch (err) {
    console.log(err)
    let time = new Date()
    new CronDB({ cronId: api.cronId, time, api: api.name, errors: [JSON.stringify(err)] }).save()
  }

}
