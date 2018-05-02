
import { Connector, Config } from './connector'

console.log('------------------------------------------------------------------')
console.log('Starting MOS Gateway')
let c = new Connector()

let host = '127.0.0.1'
let port = 3000
let logPath = ''

let prevProcessArg = ''
process.argv.forEach((val) => {
	if (prevProcessArg.match(/-host/i)) {
		host = val
	} else if (prevProcessArg.match(/-port/i)) {
		port = parseInt(val, 10)
	} else if (prevProcessArg.match(/-log/i)) {
		logPath = val
	}
	prevProcessArg = val + ''
})

logPath = logPath

let config: Config = {
	core: {
		host: host,
		port: port
	},
	mos: {
		self: {

			mosID: 'sofie.tv.automation',
			acceptsConnections: true, // default:true
			// accepsConnectionsFrom: ['127.0.0.1'],
			profiles: {
				'0': true,
				'1': true,
				'2': true,
				'3': false,
				'4': false,
				'5': false,
				'6': false,
				'7': false
			}
		},
		devices: [{
			primary: {
				id: '2012R2ENPS8VM',
				host: '10.0.1.244'
			}
			/*secondary?: {
				ncsID: string;
				host: string;
			},*/
		}]
	}
}
console.log('Core:          ' + config.core.host + ':' + config.core.port)
console.log('Mos id:        ' + config.mos.self.mosID)
config.mos.devices.forEach((device) => {
	if (device.primary) console.log('Mos Primary:   ' + device.primary.host)
	if (device.secondary) console.log('Mos Secondary: ' + device.secondary.host)
})
console.log('------------------------------------------------------------------')
c.init(config)
