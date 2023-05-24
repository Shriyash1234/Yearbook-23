import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as TiIcons from 'react-icons/ti';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
export const SidebarData = [
  {
    title: 'Yearbook| Class of 2023',
    path: '/Yearbook23',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  // {
  //   title: 'Messages from professors',
  //   path: '/professor',
  //   icon: <TiIcons.TiMessages />,
  //   cName: 'nav-text'
  // },
  {
    title: 'Messages from Juniors',
    path: '/Yearbook23/juniorMessages',
    icon: <FiIcons.FiMessageSquare />,
    cName: 'nav-text'
  },
  {
    title: 'Memorylane',
    path: '/Yearbook23/Memorylane',
    icon: <HiIcons.HiPhotograph />,
    cName: 'nav-text'
  },
  {
    title: 'Confessions',
    path: '/Yearbook23/Confessions',
    icon: <FiIcons.FiFileText />,
    cName: 'nav-text'
  },
  {
    title: 'Meet the team',
    path: '/team',
    icon: <AiIcons.AiOutlineTeam/>,
    cName: 'nav-text'
  }
];