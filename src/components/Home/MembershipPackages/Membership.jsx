import React, { useEffect, useState } from "react";
import PackagesCard from "./PackagesCard";
import axios from "axios";


const Membership = () => {
  const [packages,setPackages]=useState([])
  useEffect(()=>{
axios('/packages.json')
.then(data=>setPackages(data.data))
  },[])
  return (
    <div>
      <section className="py-20 dark:bg-gray-100 dark:text-gray-800">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="font-bold tracking-wider uppercase dark:text-violet-600">
              Pricing
            </span>
            <h2 className="text-4xl font-bold lg:text-5xl">
              Choose your best plan
            </h2>
          </div>
          <div className="grid md:grid-cols-3 items-stretch -mx-4 justify-center " >
            {
              packages.map((pack,i)=><PackagesCard pack={pack} key={i}></PackagesCard>)
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Membership;
