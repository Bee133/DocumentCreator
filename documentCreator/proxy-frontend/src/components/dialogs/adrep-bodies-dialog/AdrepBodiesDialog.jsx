import { DatePicker, Input, Space } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import { Select } from 'antd'; 

import AdrepBodyService from "../../../api/services/adrep-body-service"; 

import dayjs from 'dayjs';

const { Option } = Select; 

 

export const AdrepBodiesDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 products, 
 adrepHeaderId, 
 ...props 

}) => { 
 const [adrepBody, setAdrepBody] = useState(null); 

 
 useEffect(() => { 
  if (currentRecord) { 
   setAdrepBody(currentRecord); 
  } else { 
   setAdrepBody(null); 
  } 
 }, [currentRecord]) 

 
 const onOkHandler = async () => { 
  const record = 
   currentRecord 
    ? await AdrepBodyService.updateRecord({ 
     id: currentRecord.id, 
     ...adrepBody, 
    }) 
    : await AdrepBodyService.createRecord({...adrepBody, adrepHeaderId}) 
  onOk(record); 
 } 

 
 return ( 
  <Modal 
   open={visible} 
   title={currentRecord ? 'Редактировать' : 'Создать'} 
   onOk={onOkHandler} 
   onCancel={onCancel} 
  > 
   <Space direction="vertical"> 

    <Space>
      <Input  
        value={adrepBody?.numberB || ''} 
        onChange={e => setAdrepBody({ ...adrepBody, numberB: e.target.value })} 
        placeholder="Укажите номер по порядку" 
      /> 

      <DatePicker 
        value={dayjs(adrepBody?.dateOfDocB , 'YYYY-MM-DD').isValid() ? dayjs(adrepBody.dateOfDocB , 'YYYY-MM-DD') : null} 
        onChange={date => setAdrepBody({ ...adrepBody, dateOfDocB: date })} 
        placeholder={"Укажите дату документа, подтверждающего производственные расходы"} 
        style={{ width: 232 }} 
        format="DD.MM.YYYY"
        allowClear={false} 
      /> 
    </Space>
 
    <Space>
      <Input  
        value={adrepBody?.numOfDocB || ''} 
        onChange={e => setAdrepBody({ ...adrepBody, numOfDocB: e.target.value })} 
        placeholder="Укажите документа, подтверждающего производственные расходы" 
      /> 

      <Input  
        value={adrepBody?.nameOfDocB || ''} 
        onChange={e => setAdrepBody({ ...adrepBody, nameOfDocB: e.target.value })} 
        placeholder="Укажите наименование документа (расхода)" 
      /> 
    </Space>
  
    <Space>
      <Input  
        value={adrepBody?.rubKopByRepB || ''} 
        onChange={e => setAdrepBody({ ...adrepBody, rubKopByRepB: e.target.value })} 
        placeholder="Укажите сумму расхода по отчету в руб. коп." 
      /> 

      <Input  
        value={adrepBody?.inCurByRepB || ''} 
        onChange={e => setAdrepBody({ ...adrepBody, inCurByRepB: e.target.value })} 
        placeholder="Укажите сумму расхода по отчету в валюте" 
      /> 
    </Space>

    <Space>
      <Input  
        value={adrepBody?.rubKopByAccountB || ''} 
        onChange={e => setAdrepBody({ ...adrepBody, rubKopByAccountB: e.target.value })} 
        placeholder="Укажите сумму расхода принятого к учету в руб. коп." 
      /> 

      <Input  
        value={adrepBody?.inCurByAccountB || ''} 
        onChange={e => setAdrepBody({ ...adrepBody, inCurByAccountB: e.target.value })} 
        placeholder="Укажите сумму расхода принятого к учету в валюте" 
      /> 
    </Space>

    <Space> 

 
     <Input 
      value={adrepBody?.debetScore || ''} 
      onChange={e => setAdrepBody({ ...adrepBody, debetScore: e.target.value })} 
      placeholder="Дебет счета, субсчета" 
     /> 

 
    </Space> 

 
   </Space> 

 
  </Modal> 
 ) 

} 