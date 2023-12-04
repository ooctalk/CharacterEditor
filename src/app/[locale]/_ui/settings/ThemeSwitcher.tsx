import { useState, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function ThemeSwitcher() {
  const [enabled, setEnabled] = useState(false)
  const { theme, setTheme } = useTheme();
  useEffect(() => {  
    setEnabled(theme === 'light' ? false : true);  
  }, [theme]);
  const handleClick = () => {  
    setTheme(theme === 'light' ? 'dark' : 'light');  
  };  
  return (
    <Switch
      checked={enabled}
      onClick={handleClick}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-indigo-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
      )}
    >
      <span className="sr-only">Dark Mode</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5 bg-gray-50' : 'translate-x-0 bg-gray-50',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-gray-800" fill="none" viewBox="0 0 12 12">
            <SunIcon/>
          </svg>
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <svg className="h-3 w-3 text-gray-800" fill="currentColor" viewBox="0 0 12 12">
            <MoonIcon/>
          </svg>
        </span>
      </span>
    </Switch>
  )
}
