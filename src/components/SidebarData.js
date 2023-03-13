import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as TiIcons from 'react-icons/ti';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
export const SidebarData = [
  {
    title: 'Yearbook| Class of 2023',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Messages from professors',
    path: '/reports',
    icon: <TiIcons.TiMessages />,
    cName: 'nav-text'
  },
  {
    title: 'Messages from Juniors',
    path: '/products',
    icon: <FiIcons.FiMessageSquare />,
    cName: 'nav-text'
  },
  {
    title: 'Memorylane',
    path: '/team',
    icon: <HiIcons.HiPhotograph />,
    cName: 'nav-text'
  },
  {
    title: 'Confessions',
    path: '/messages',
    icon: <FiIcons.FiFileText />,
    cName: 'nav-text'
  },
  {
    title: 'Meet the team',
    path: '/support',
    icon: <AiIcons.AiOutlineTeam/>,
    cName: 'nav-text'
  }
];