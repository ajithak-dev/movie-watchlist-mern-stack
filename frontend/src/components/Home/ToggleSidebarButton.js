import React from 'react';
import { useSidebar } from '../../context/SidebarContext';

const ToggleSidebarButton = () => {
  const { toggleSidebar } = useSidebar();

  return <button onClick={toggleSidebar}>☰</button>;
};

export default ToggleSidebarButton;

