import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux/reducers/authSlice";
import { baseUrl } from "../../utils/baseUrl";
import Search from "../Search";
import Sidebar from "./Sidebar";

function Layout({ children }: any) {



  const [results, setResults] = useState([]);
  const [text, setText] = useState(true);

  const handleChange = async (e: any) => {
    e.preventDefault();
    if (e.target.value === '' || e.target.value.trim().length === 0) {
      setText(true);
      return;
    } else {
      setText(false);
      const res = await axios.get(`${baseUrl}/search/${e.target.value}`)
      setResults(res.data)
    }

  }


  return (
    <div className="h-1 flex">
      <Sidebar />
      {/* <div className="flex" > */}

      <div className="flex-auto w-screen border-r px-16 py-8 text-2xl font-bold lg:w-screen scrollbar-hide overflow-x-hidden h-screen">
        {children}
      </div>
      <div className="p-5 hidden md:block">
        <div className='flex border-2 px-5 py-2 rounded-3xl' >
          <input className='outline-none' type="text" placeholder='Search...' onChange={handleChange} />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <Search text={text} results={results} />
      </div>
      {/* </div> */}
    </div>
  );
}

export default Layout;
