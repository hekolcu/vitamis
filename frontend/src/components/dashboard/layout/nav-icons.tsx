import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import { XSquare } from '@phosphor-icons/react/dist/ssr/XSquare';
import { PlusSquare } from '@phosphor-icons/react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { CheckSquare } from '@phosphor-icons/react';
import { BowlFood } from '@phosphor-icons/react';
import { Article } from '@phosphor-icons/react';
import {Users} from '@phosphor-icons/react';
import { UserList } from '@phosphor-icons/react';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  'plugs-connected': PlugsConnectedIcon,
  'x-square': XSquare,
  'plus-square': PlusSquare,
  'search': MagnifyingGlass,
  'confirm': CheckSquare,
  'meal': BowlFood,
  'report': Article,
  'admin-confirm': Users,
  'advisee-management': UserList,
  'articles': Article,
  user: UserIcon,
  users: UsersIcon,
} as Record<string, Icon>;
