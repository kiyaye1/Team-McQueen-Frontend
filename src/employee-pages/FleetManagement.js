import * as React from 'react';
import { db } from '../FirebaseConfig'
import { ref, onValue } from 'firebase/database'
import { useState, useEffect } from 'react'


function FleetManagement() {

      // use effect loop to get the data frequently so it can detect when it is changed
  useEffect(() => {
    return onValue(ref(db, '/cars/'), querySnapshot => {
      // full data snapshot
      let data = querySnapshot.val()
      console.log(data)
    })
  })

    return (
      <><div class = "m-16">
            <h1 class = "text-section-head">Fleet Management</h1>
            
      </div></>
  
    );
  }
  
  export default FleetManagement;