import { cookies } from 'next/headers';
import Link from 'next/link';
import { 
  CreditCardIcon,
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

async function getBillingData(token: string) {
  const [subscriptionRes, ordersRes] = await Promise.all([
    fetch('http://localhost:4000/api/billing/subscription', {
      headers: { 'Cookie': `token=${token}` }
    }),
    fetch('http://localhost:4000/api/billing/orders', {
      headers: { 'Cookie': `token=${token}` }
    })
  ]);

  const subscription = subscriptionRes.ok ? await subscriptionRes.json() : { data: null };
  const orders = ordersRes.ok ? await ordersRes.json() : { data: [] };

  return { 
    subscription: subscription.data, 
    orders: orders.data 
  };
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    features: [
      '3 Agenți AI',
      '1,000 conversații/lună',
      'Suport email',
      'Analiză de bază',
      'Integrări standard'
    ],
    notIncluded: [
      'API acces',
      'White-label',
      'Suport prioritar'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 299,
    popular: true,
    features: [
      '10 Agenți AI',
      '10,000 conversații/lună',
      'Suport prioritar',
      'Analiză avansată',
      'Toate integrările',
      'API acces',
      'Customizare brand'
    ],
    notIncluded: [
      'White-label complet'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Agenți nelimitați',
      'Conversații nelimitate',
      'Suport dedicat 24/7',
      'Analiză enterprise',
      'Toate integrările',
      'API acces complet',
      'White-label',
      'SLA garantat'
    ],
    notIncluded: []
  }
];

export default async function BillingPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  const { subscription, orders } = await getBillingData(token!.value);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Abonament & Facturare</h1>
        <p className="text-gray-400 mt-1">Gestionează planul tău și vizualizează istoricul facturilor</p>
      </div>

      {/* Current subscription */}
      {subscription && (
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Abonament curent</h2>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-white">{subscription.plan.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  subscription.status === 'ACTIVE' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {subscription.status === 'ACTIVE' ? 'Activ' : 'Expirat'}
                </span>
              </div>
              <p className="text-gray-400">
                {subscription.status === 'ACTIVE' 
                  ? `Reînnoire la ${new Date(subscription.expiresAt).toLocaleDateString('ro-RO')}`
                  : 'Abonamentul tău a expirat'
                }
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Preț lunar</p>
              <p className="text-3xl font-bold text-white">{subscription.plan.price} RON</p>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Actualizează plan
            </button>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
              Anulează abonament
            </button>
          </div>
        </div>
      )}

      {/* Plans */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Planuri disponibile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-gray-900 rounded-xl border p-6 relative ${
                plan.popular 
                  ? 'border-blue-500' 
                  : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                  Cel mai popular
                </span>
              )}
              
              <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                {typeof plan.price === 'number' ? (
                  <>
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">RON/lună</span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature, index) => (
                  <li key={`not-${index}`} className="flex items-start">
                    <XMarkIcon className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-500 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}>
                {plan.id === 'enterprise' ? 'Contactează-ne' : 'Alege planul'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing history */}
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Istoric facturi</h2>
        
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="pb-3 text-sm font-medium text-gray-400">Factură</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Dată</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Plan</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Sumă</th>
                  <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                  <th className="pb-3 text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any) => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-4">
                      <span className="text-white font-mono text-sm">
                        #{order.id.slice(0, 8)}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('ro-RO')}
                    </td>
                    <td className="py-4 text-gray-300 text-sm">
                      {order.description || 'Abonament'}
                    </td>
                    <td className="py-4 text-white font-medium">
                      {order.amount} RON
                    </td>
                    <td className="py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'COMPLETED'
                          ? 'bg-green-500/10 text-green-500'
                          : order.status === 'PENDING'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {order.status === 'COMPLETED' ? 'Plătit' : 
                         order.status === 'PENDING' ? 'În așteptare' : 'Anulat'}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-blue-500 hover:text-blue-400">
                        <ArrowDownTrayIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <DocumentTextIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Nu există facturi încă</p>
          </div>
        )}
      </div>

      {/* Payment method */}
      <div className="mt-6 bg-gray-900 rounded-xl border border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Metodă de plată</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCardIcon className="w-8 h-8 text-gray-400 mr-4" />
            <div>
              <p className="text-white font-medium">•••• •••• •••• 4242</p>
              <p className="text-gray-400 text-sm">Expiră 12/24</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
            Actualizează
          </button>
        </div>
      </div>
    </div>
  );
}