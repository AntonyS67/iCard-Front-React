import React,{useState,useEffect} from 'react';
import {Button,Icon,Checkbox} from 'semantic-ui-react'
import {map} from "lodash"
import "./TablesList.scss"
import { Table } from '../';

export function TablesList(props) {
    const { tables } = props
    const [reload,setReload] = useState(false)
    const [autoReload,setAutoReload] = useState(false)

    const onReload = () => setReload(prev => !prev)

    useEffect(()=>{
        if(autoReload){
            const autoReloadAction = () => {
                onReload()
                setTimeout(() => {
                    autoReloadAction()
                }, 5000);
            }
            autoReloadAction()
        }
    },[autoReload])

    const checkAutoReload = (check) => {
        if(check){
            setAutoReload(check)
        }else{
            window.location.reload()
        }
    }
  return (
      <div className='tables-list-admin'>
          <Button primary icon onClick={onReload} className='tables-list-admin__reload'>
              <Icon name="refresh"/>
          </Button>
          <div className='tables-list-admin__reload-toggle'>
            <span>Reload automatico</span>
            <Checkbox
                toggle
                checked={autoReload}
                onChange={(_,data)=>checkAutoReload(data.checked)}
            />
          </div>
          {map(tables,(table)=>(
              <Table key={table.number} table={table} reload={reload}/>
          ))}
      </div>
  )
}
