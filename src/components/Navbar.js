import { Disclosure } from '@headlessui/react'
import { Link,useLocation  } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'About this application', href: '/about'},
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const location = useLocation()
  return (
    <Disclosure as="nav" className="bg-gray-800 ">
      <div className=" max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="flex items-center justify-start sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
                {/*Logo */}
                <span className="font-titanOne text-white text-2xl">
                Sakkokassa
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                        location.pathname === item.href
                        ? 'bg-gray-900 text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',          
                    )}
                  >
                    {item.name}
                  </Link>
                ))}         
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
            </button>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default Navbar