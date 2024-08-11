import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
      <div className="sidebare">
        <div className="sidebare-options">
          <NavLink to="/add" className="sidebare-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
          </NavLink>
          <NavLink to="/Category" className="sidebare-option">
            <img src={assets.add_icon} alt="" />
            <p>Category Items</p>
          </NavLink>
          <NavLink to="/List" className="sidebare-option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
          </NavLink>
          <NavLink to="/ListCategory" className="sidebare-option">
            <img src={assets.order_icon} alt="" />
            <p>List Category</p>
          </NavLink>

          <NavLink to="/addArticle" className="sidebare-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Article</p>
          </NavLink>

          <NavLink to="/ListArticle" className="sidebare-option">
            <img src={assets.order_icon} alt="" />
            <p>List Article</p>
          </NavLink>
          <NavLink to="/CategoryArticle" className="sidebare-option">
            <img src={assets.add_icon} alt="" />
            <p>Add Category Article</p>
          </NavLink>
          <NavLink to="/listCategoryArticle" className="sidebare-option">
            <img src={assets.order_icon} alt="" />
            <p>List Category Article</p>
          </NavLink>
        </div>
      </div>
  )
}

export default Sidebar