import { DatePicker, Input, Space, Select } from "antd"; 

import Modal from "antd/lib/modal/Modal"; 

import React, { useEffect, useState } from "react"; 

import AdrepHeadersService from "../../../api/services/adrep-header-service"; 

import dayjs from 'dayjs';

 

const { Option } = Select; 

 

export const AdrepHeadersDialog = ({ 
 visible, 
 onOk, 
 onCancel, 
 currentRecord, 
 individuals, 
 organizations, 
 ...props 

}) => { 
 const [adrepHeader, setAdrepHeader] = useState(null); 

 
 useEffect(() => { 
  if (currentRecord) { 
   setAdrepHeader(currentRecord); 
  } else { 
   setAdrepHeader(null); 
  } 
 }, [currentRecord]) 


 const onOkHandler = async () => { 
  const record = 
   currentRecord 
    ? await AdrepHeadersService.updateRecord({ 
     id: currentRecord.id, 
     ...adrepHeader, 
    }) 
    : await AdrepHeadersService.createRecord(adrepHeader) 
  onOk(record); 
 } 

 return ( 
  <Modal 
   visible={visible} 
   title={currentRecord ? 'Редактировать' : 'Создать'} 
   onOk={onOkHandler} 
   onCancel={onCancel} DD
  > 

 
   <Space direction="vertical" style={{ width: '100%' }}> 
    

 
    <Space style={{width: '100%'}}> 
      <Select 
        value={adrepHeader?.nameOfOrgInd || null} 
        onChange={value => setAdrepHeader({ ...adrepHeader, nameOfOrgInd: value })} 
        placeholder={"Выберите организацию"} 
        style={{ width: 232 }} 
      > 
        {organizations.map(it => <Option 
        value={it.id}> 
        {it.title} 
        </Option>)} 
      </Select> 

      <Input 
        value={adrepHeader?.byOKPO || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, byOKPO: e.target.value })} 
        placeholder="Укажите отчёт в сумме(руб.)" 
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.rubTR || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, rubTR: e.target.value })} 
        placeholder="Укажите отчёт в сумме(руб.)" 
      /> 
      <Input 
        value={adrepHeader?.kopTR || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, kopTR: e.target.value })} 
        placeholder="Укажите отчёт в сумме(коп.)"  
      /> 
    </Space>


    <Space style={{width: '100%'}}> 
      <Input 
          value={adrepHeader?.adrepNum1 || ''} 
          onChange={e => setAdrepHeader({ ...adrepHeader, adrepNum1: e.target.value })} 
          placeholder="Укажите номер авансового отчёта"  
      /> 

 
     <DatePicker 
     value={dayjs(adrepHeader?.adrepDate , 'YYYY-MM-DD').isValid() ? dayjs(adrepHeader.adrepDate , 'YYYY-MM-DD') : null} 
      onChange={date => setAdrepHeader({ ...adrepHeader, adrepDate: date })} 
      placeholder={"Укажите дату авансового отчёта"} 
      style={{ width: 232 }} 
      format="DD.MM.YYYY"
      allowClear={false} 
     /> 
 
    </Space> 

 
    <Space style={{width: '100%'}}> 
 
     <Select 
      value={adrepHeader?.postBossIndId || null} 
      onChange={value => setAdrepHeader({ ...adrepHeader, postBossIndId: value })} 
      placeholder={"Укажите должность руководителя"} 
      style={{ width: 232 }} 
     > 
      {individuals.map(it => <Option 
       value={it.id}> 
       {it.post} 
      </Option>)} 
    </Select> 

      <DatePicker 
      value={dayjs(adrepHeader?.dateTR , 'YYYY-MM-DD').isValid() ? dayjs(adrepHeader.dateTR , 'YYYY-MM-DD') : null} 
        onChange={date => setAdrepHeader({ ...adrepHeader, dateTR: date })} 
        placeholder={"Укажите дату подписи руководителя"} 
        style={{ width: 232 }} 
        format="DD.MM.YYYY"
        allowClear={false} 
      />
    </Space> 

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.structDivision || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, structDivision: e.target.value })} 
        placeholder="Укажите структурное подразделение" 
      /> 
      <Input 
        value={adrepHeader?.codeCD || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, codeCD: e.target.value })} 
        placeholder="Укажите код структурного подразделения"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.accountablePerson || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, accountablePerson: e.target.value })} 
        placeholder="Укажите подотчетное лицо" 
      /> 
      <Input 
        value={adrepHeader?.serviceNumber || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, serviceNumber: e.target.value })} 
        placeholder="Укажите табильный номер"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Select 
        value={adrepHeader?.postIndId || null} 
        onChange={value => setAdrepHeader({ ...adrepHeader, postIndId: value })} 
        placeholder={"Укажите профессию(должность)"} 
        style={{ width: 232 }} 
      > 
        {individuals.map(it => <Option 
        value={it.id}> 
        {it.post} 
        </Option>)} 
      </Select> 
      <Input 
        value={adrepHeader?.getAd || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, getAd: e.target.value })} 
        placeholder="Укажите назначение аванса"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.previousAdBalance || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, previousAdBalance: e.target.value })} 
        placeholder="Укажите предыдущий аванс(остаток)" 
      /> 
      <Input 
        value={adrepHeader?.previousAdOverspending || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, previousAdOverspending: e.target.value })} 
        placeholder="Укажите предыдущий аванс(перерасход)"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.adFirstBoxOffice || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, adFirstBoxOffice: e.target.value })} 
        placeholder="Укажите аванс 1. из кассы" 
      /> 
      <Input 
        value={adrepHeader?.inCurrency || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, inCurrency: e.target.value })} 
        placeholder="Укажите 1а. в валюте (справочно)"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.underCurrency2 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, underCurrency2: e.target.value })} 
        placeholder="Укажите 2." 
      /> 
      <Input 
        value={adrepHeader?.totalReceived || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, totalReceived: e.target.value })} 
        placeholder="Укажите сумму итого полученого"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.usepUP || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, usepUP: e.target.value })} 
        placeholder="Укажите сумму израсходованого" 
      /> 
      <Input 
        value={adrepHeader?.remains || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, remains: e.target.value })} 
        placeholder="Укажите сумму остатка"  
      /> 
    </Space>

    <Space style={{width: '100%'}}>
      <Input 
        value={adrepHeader?.costOverruns || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, costOverruns: e.target.value })} 
        placeholder="Укажите сумму перерасхода"  
      /> 
    </Space>
    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.dS1 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, dS1: e.target.value })} 
        placeholder="Укажите счёт дебета №1" 
      /> 
      <Input 
        value={adrepHeader?.dSu1 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, dSu1: e.target.value })} 
        placeholder="Укажите сумму дебета №1"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.crS1 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, crS1: e.target.value })} 
        placeholder="Укажите счёт кредита №1" 
      /> 
      <Input 
        value={adrepHeader?.crSu1 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, crSu1: e.target.value })} 
        placeholder="Укажите сумму кредита №1"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.dS2 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, dS2: e.target.value })} 
        placeholder="Укажите счёт дебета №2" 
      /> 
      <Input 
        value={adrepHeader?.dSu2 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, dSu2: e.target.value })} 
        placeholder="Укажите сумму дебета №2"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.crS2 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, crS2: e.target.value })} 
        placeholder="Укажите счёт кредита №2" 
      /> 
      <Input 
        value={adrepHeader?.crSu2 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, crSu2: e.target.value })} 
        placeholder="Укажите сумму кредита №2"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.application || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, application: e.target.value })} 
        placeholder="Укажите приложение ... документов на" 
      /> 
      <Input 
        value={adrepHeader?.documentsOn || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, documentsOn: e.target.value })} 
        placeholder="Укажите документов на ... листах"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.rub2 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, rub2: e.target.value })} 
        placeholder="Укажите внесение остатка/выдачу перерасхода в сумме(руб.)" 
      /> 
      <Input 
        value={adrepHeader?.kop2 || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, kop2: e.target.value })} 
        placeholder="Укажите внесение остатка/выдачу перерасхода в сумме(коп.)"  
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.orderNum || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, orderNum: e.target.value })} 
        placeholder="Укажите номер кассового ордера" 
      /> 
      <DatePicker 
      value={dayjs(adrepHeader?.dateUndNum , 'YYYY-MM-DD').isValid() ? dayjs(adrepHeader.dateUndNum , 'YYYY-MM-DD') : null} 
        onChange={date => setAdrepHeader({ ...adrepHeader, dateUndNum: date })} 
        placeholder={"Укажите дату кассового ордера"} 
        style={{ width: 232 }} 
        format="DD.MM.YYYY"
        allowClear={false} 
      />
    </Space>

    <Space style={{width: '100%'}}> 
      <DatePicker 
      value={dayjs(adrepHeader?.dateUnddateUnd , 'YYYY-MM-DD').isValid() ? dayjs(adrepHeader.dateUnddateUnd , 'YYYY-MM-DD') : null} 
        onChange={date => setAdrepHeader({ ...adrepHeader, dateUnddateUnd: date })} 
        placeholder={"Укажите дату подписи бухгалтера(кассира)"} 
        style={{ width: 232 }} 
        format="DD.MM.YYYY"
        allowClear={false} 
      />
      <Input 
        value={adrepHeader?.accepForVer || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, accepForVer: e.target.value })} 
        placeholder="Укажите принят к проверке от ... расписки" 
      /> 
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.adrepNum || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, adrepNum: e.target.value })} 
        placeholder="Укажите номер авансового отчёта" 
      /> 
      <DatePicker 
      value={dayjs(adrepHeader?.dateUndAdrepNum , 'YYYY-MM-DD').isValid() ? dayjs(adrepHeader.dateUndAdrepNum , 'YYYY-MM-DD') : null} 
        onChange={date => setAdrepHeader({ ...adrepHeader, dateUndAdrepNum: date })} 
        placeholder={"Укажите дату принятия к проверке авансового отчёта "} 
        style={{ width: 232 }} 
        format="DD.MM.YYYY"
        allowClear={false} 
      />
    </Space>

    <Space style={{width: '100%'}}> 
      <Input 
        value={adrepHeader?.countOfDoc || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, countOfDoc: e.target.value })} 
        placeholder="Укажите количество документов" 
      /> 
      <Input 
        value={adrepHeader?.onSheets || ''} 
        onChange={e => setAdrepHeader({ ...adrepHeader, onSheets: e.target.value })} 
        placeholder="Укажите количество листов"  
      /> 
    </Space>

    <Space style={{width: '100%'}}>
      <DatePicker 
        value={dayjs(adrepHeader?.dateLast , 'YYYY-MM-DD').isValid() ? dayjs(adrepHeader.dateLast , 'YYYY-MM-DD') : null} 
          onChange={date => setAdrepHeader({ ...adrepHeader, dateLast: date })} 
          placeholder={"Укажите дату подписи бухгалтера "} 
          style={{ width: 232 }} 
          format="DD.MM.YYYY"
          allowClear={false} 
      />
    </Space> 
   </Space> 
  </Modal> 
 ) 

 

}  