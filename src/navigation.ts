import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
export const locales = ['en', 'zh-CN','zh-TW','de','es','fr','ja','kr','pt','ru','it'] as const;
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});