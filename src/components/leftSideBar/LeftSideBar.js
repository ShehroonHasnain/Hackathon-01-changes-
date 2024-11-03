import React from 'react'
import { Sidebar } from "flowbite-react";
import "./LeftSideBar.css"
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

export default function LeftSideBar() {
    return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup >
         <div  className="siderDiv" ><Sidebar.Item href="#" icon={HiChartPie} className="sider-items">
            My Account
          </Sidebar.Item>
          </div>
          <div  className="siderDiv" >
          <Sidebar.Item href="#" icon={HiViewBoards} label="Pro" labelColor="dark" className="sider-items">
            Request
          </Sidebar.Item>
          </div>
          <div  className="siderDiv" >
          <Sidebar.Item href="#" icon={HiInbox} label="3" className="sider-items">
            Inbox
          </Sidebar.Item>
          </div>
          <div  className="siderDiv" >
          <Sidebar.Item href="#" icon={HiUser} className="sider-items">
            Users
          </Sidebar.Item>
          </div>
          <div  className="siderDiv" >
          <Sidebar.Item href="#" icon={HiShoppingBag}className="sider-items">
            Products
          </Sidebar.Item>
          </div>
          <div  className="siderDiv" >
          <Sidebar.Item href="#" icon={HiArrowSmRight}className="sider-items">
            Sign In
          </Sidebar.Item>
          </div>
          <div  className="siderDiv" >
          <Sidebar.Item href="#" icon={HiTable}className="sider-items">
            Sign Up
          </Sidebar.Item>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
