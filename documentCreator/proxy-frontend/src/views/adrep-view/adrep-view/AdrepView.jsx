import { DatePicker, Button, Space, Table, Select, Input } from "antd"; 
import React, { useEffect, useRef, useState } from "react"; 
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { useParams } from "react-router"; 
import AdrepBodyService from "../../../api/services/adrep-body-service"; 
import AdrepHeadersService from "../../../api/services/adrep-header-service"; 
import OrganizationService from "../../../api/services/organization-service"; 
import IndividualService from "../../../api/services/individuals-service"; 
import ProductService from "../../../api/services/product-service"; 
import { AdrepBodiesDialog } from "../../../components/dialogs/adrep-bodies-dialog/AdrepBodiesDialog"; 
import { useReactToPrint } from "react-to-print"; 
import dayjs from 'dayjs';
import './style.module.css'

 

const { Option } = Select; 

 

export const AdrepView = ({ 
 onOk, 
 onClick, 
 ...props 

}) => { 
 const columns = [ 
  { 
   title: 'Номер по порядку', 
   dataIndex: 'numberB', 
   key: 'numberB', 
  }, 
  { 
    title: 'Дата документа, подтверждающего производственные расходы', 
    dataIndex: 'dateOfDocB', 
    render:(text)=>dayjs(text).format('DD.MM.YYYY') 
  }, 
  { 
   title: 'Номер документа, подтверждающего производственные расходы', 
   dataIndex: 'numOfDocB', 
  }, 
  { 
   title: 'Наименование документа, расхода', 
   dataIndex: 'nameOfDocB', 
  }, 
  { 
    title: 'Сумма расхода по отчету в руб. коп.', 
    dataIndex: 'rubKopByRepB', 
   }, 
   { 
    title: 'Сумма расхода по отчету в валюте', 
    dataIndex: 'inCurByRepB', 
   },
   { 
    title: 'Сумма расхода принятого к учету в руб. коп.', 
    dataIndex: 'rubKopByAccountB', 
   },
   { 
    title: 'Сумма расхода принятого к учету в валюте', 
    dataIndex: 'inCurByAccountB', 
   },
   { 
    title: 'Сумма расхода принятого к учету в валюте', 
    dataIndex: 'Дебет счета, субсчета', 
   },
  { 
   title: 'Действия', 
   key: 'actions', 
   render: (text, record) => { 
    return ( 
     <Space size="middle"> 
      <div onClick={() => updateRecordHandler(record)}> 
       <EditOutlined /> 
      </div> 
      <div onClick={() => deleteRecordHandler(record.id)}> 
       <DeleteOutlined /> 
      </div> 
     </Space> 
    ) 
   } 
  } 
 ]; 

 
 const componentRef = useRef(); 
 const handlePrint = useReactToPrint({ 
  content: () => componentRef.current, 
 }); 
 const { id } = useParams(); 
 const [adrep, setAdrep] = useState(null); 
 const [list, setList] = useState([]); 
 const [individuals, setIndividuals] = useState([]); 
 const [organizations, setOrganizations] = useState([]); 
 const [products, setProducts] = useState([]); 
 const [currentRecord, setCurrentRecord] = useState(null); 
 const [visible, setVisible] = useState(false); 

 
 useEffect( () => { 
  async function fetchData() { 

   const list = await AdrepBodyService.getAllHeadersRecords(id); 
   const individuals = await IndividualService.getAllRecords(); 
   const organizations = await OrganizationService.getAllRecords(); 
   const products = await ProductService.getAllRecords(); 
   const adrep = await AdrepHeadersService.getOneRecord(id);
   console.log(adrep)
 
   setList(list); 
   setAdrep(adrep); 

 
   setIndividuals(individuals); 
   setOrganizations(organizations); 
   setProducts(products); 

 
   return () => { 
    setList([]); 
    setAdrep(null);

 
    setIndividuals([]); 
    setOrganizations([]); 
    setProducts([]); 
  }; 
  } 
  fetchData(); 
 }, [id]); 



 const createRecordHandler = () => { 
  setCurrentRecord(null) 
  setVisible(true); 
 } 
 const updateRecordHandler = (record) => { 
  setCurrentRecord(record) 
  setVisible(true) 
 } 
 const deleteRecordHandler = async (recordId) => { 
  await AdrepBodyService.removeRecord(recordId); 
  setList(list.filter(it => it.id !== recordId)); 
 } 

 
 return ( 
  <div style={{ padding: 16 }}> 
   <div ref={componentRef}> 
    <Space 
     direction={'vertical'} 
     align={'rigth'} 
     style={{ width: '100%', marginBottom: 24 }} 
    > 
        <pre align = 'right'>Унифицированная форма № АО-1</pre>
        <pre align = 'right'>Утверждена Постановлением Госкомстата России</pre>
        <pre align = 'right'>от 01.08.2001 № 55</pre>
        <pre align = 'right'>|            Код              |</pre>
        <pre align = 'right'>Форма по ОКУД|          0302001            |</pre>
        <pre align = 'left'>____________________________<Select 
          value={adrep?.nameOfOrgInd || null} 
          onChange={value => setAdrep({ ...adrep, nameOfOrgInd: value },AdrepHeadersService.updateRecord({ 
            ...adrep, nameOfOrgInd: value 
          })) 
          } 
          placeholder={"Выберите организацию"} 
          style={{ width: 425 }} 
          > 
          {organizations.map(it => <Option 
          value={it.id}> 
          {it.title} 
          </Option>)} 
          </Select> __________________________________                                            по ОКПО|
          <Button style={{ width: 201 }}
          >{adrep?.byOKPO}</Button> |</pre>
    </Space>
    
    <Space 
      direction={'vertical'}
      align={'right'}
      style={{ width: '100%', marginBottom: 24 }}
    >
      <h1><pre align={'center'}>                                        УТВЕРЖДАЮ</pre></h1>
      <pre align={'right'}>Отчёт в сумме___________________<Button >{adrep?.rubTR}</Button>______________________________</pre>
      <pre align={'right'}> |    Номер    |      Дата      |                                                                  ___________________руб. <Button >{adrep?.kopTR}</Button>_______коп. </pre>
    </Space>

    <Space 
     direction={'vertical'} 
     align={'right'} 
     style={{ width: '100%', marginBottom: 24 }} 
    > 
     <h2><pre>                         АВАНСОВЫЙ ОТЧЁТ <strong>|<Button style={{ width: 97 }}>{adrep?.adrepNum1}</Button>|<DatePicker 
      format="DD.MM.YYYY" 
      value={dayjs(adrep?.adrepDate, 'YYYY-MM-DD') || null} 
      onChange={date => setAdrep({ ...adrep, adrepDate: date },AdrepHeadersService.updateRecord({ 
       ...adrep, adrepDate: date 
      })) 
      } 
      style={{ width: 110}} 
      allowClear={false} 
     />|</strong>                          Руководитель_____<Select 
     value={adrep?.postBossIndId || null} 
     onChange={value => setAdrep({ ...adrep, postBossIndId: value },AdrepHeadersService.updateRecord({ 
       ...adrep, postBossIndId: value 
     })) 
     } 
     placeholder={"Выберите должность руководителя"} 
     style={{ width: 150 }} 
     > 
     {individuals.map(it => <Option 
     value={it.id}> 
     {it.post} 
     </Option>)} 
     </Select>_______________</pre></h2> 
     <pre align = "right">_______________________  _______________________________________________</pre>
     <pre align = "right">       подпись                          расшифровка подписи             </pre>
     <pre align = "right"><DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(adrep?.dateTR, 'YYYY-MM-DD') || null} 
        onChange={date => setAdrep({ ...adrep, dateTR: date },AdrepHeadersService.updateRecord({ 
        ...adrep, dateTR: date 
        })) 
        } 
        style={{ width: 510}} 
        allowClear={false} 
      /></pre>
      <pre align = 'right'>|            Код              |</pre>
      <pre align = 'left'>Структурное подзразделение ______________________________________________________________________________<Button style={{ width: 250 }}>{adrep?.structDivision}</Button>_________________________________ |<Button style={{ width: 200 }}>{adrep?.codeCD}</Button>|</pre>
      <pre align = 'left'>Подотчетное лицо ______________________<Button style={{ width: 250 }}>{adrep?.accountablePerson}</Button>___________________________________________________________________________________ Табельный номер |<Button style={{ width: 200 }}>{adrep?.serviceNumber}</Button>|</pre>
      <pre align = 'left'>Профессия (должность)______________________<Select 
        value={adrep?.postIndId || null} 
        onChange={value => setAdrep({ ...adrep, postIndId: value },AdrepHeadersService.updateRecord({ 
          ...adrep, postIndId: value 
        })) 
        } 
        placeholder={"Выберите профессию должность"} 
        style={{ width: 150 }} 
        > 
        {individuals.map(it => <Option 
        value={it.id}> 
        {it.post} 
        </Option>)} 
        </Select>____________________________            Назначение аванса _______________________<Button style={{ width: 250 }}>{adrep?.getAd}</Button>_______________________</pre>
      <pre align = 'left'>|                           Наименование показателя                       |Сумма, руб. коп.|      |                                         Бухгалтерская запись                                           |</pre>
      <pre align = 'left'>|                       Предыдущий аванс (остаток)                        |<Button style={{ width: 115 }}>{adrep?.previousAdBalance}</Button>|      |                     дебет                           |                    кредит                        |</pre>
      <pre align = 'left'>|                       Предыдущий аванс (перерасход)                     |<Button style={{ width: 115 }}>{adrep?.previousAdOverspending}</Button>|      |      счет, субсчет     |     сумма, руб. коп.    |         счет, субсчет      |    сумма, руб. коп.    |</pre>
      <pre align = 'left'>|                    Получен аванс 1. из кассы                            |<Button style={{ width: 115 }}>{adrep?.adFirstBoxOffice}</Button>|      |<Button style={{ width: 177 }}>{adrep?.dS1}</Button>|<Button style={{ width: 185 }}>{adrep?.dSu1}</Button>|<Button style={{ width: 177 }}>{adrep?.crS1}</Button>|<Button style={{ width: 177 }}>{adrep?.crSu1}</Button>|</pre>
      <pre align = 'left'>|                    1а. в валюте (справочно)|                            |<Button style={{ width: 115 }}>{adrep?.inCurrency}</Button>|      |<Button style={{ width: 177 }}>{adrep?.dS2}</Button>|<Button style={{ width: 185 }}>{adrep?.dSu2}</Button>|<Button style={{ width: 177 }}>{adrep?.crS2}</Button>|<Button style={{ width: 177 }}>{adrep?.crSu2}</Button>|</pre>
      <pre align = 'left'>|2.                                                                       |<Button style={{ width: 115 }}>{adrep?.underCurrency2}</Button>|      |                         |                          |                         |                        |</pre>
      <pre align = 'left'>|                                                                         |                |      |                         |                          |                         |                        |</pre>
      <pre align = 'left'>|                      Итого получено                                     |<Button style={{ width: 115 }}>{adrep?.totalReceived}</Button>|      |                         |                          |                         |                        |</pre>
      <pre align = 'left'>|                      Израсходовано                                      |<Button style={{ width: 115 }}>{adrep?.usepUP}</Button>|      |                         |                          |                         |                        |</pre>
      <pre align = 'left'>|                      Остаток                                            |<Button style={{ width: 115 }}>{adrep?.remains}</Button>|      |                         |                          |                         |                        |</pre>
      <pre align = 'left'>|                       Перерасход                                        |<Button style={{ width: 115 }}>{adrep?.costOverruns}</Button>|      |                         |                          |                         |                        |</pre>
      <pre align = 'left'>Приложение <Button style={{ width: 115 }}>{adrep?.application}</Button> документов на <Button style={{ width: 115 }}>{adrep?.documentsOn}</Button></pre>
      <pre align = 'left'>Отчёт проверен. К утверждению в сумме _______________________________________________________________________________________________________________________________________________________________________</pre>
      <pre align = 'left'>________________________________________________________________________________________________________________________________________________________________________ руб._____коп. (_________руб.___коп.)</pre>
      <pre align = 'left'>Главный бухгалтер        _____________________________         ________________________________________________________</pre>
      <pre align = 'left'>Бухгалтер                _____________________________         ________________________________________________________</pre>
      <pre align = 'left'>Остаток внесён/Перерасход выдан в сумме <Button style={{ width: 115}}>{adrep?.rub2}</Button> руб. <Button style={{ width: 115}}>{adrep?.kop2}</Button> коп. по кассовому ордеру № <Button style={{ width: 115}}>{adrep?.orderNum}</Button> от <DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(adrep?.dateUndNum, 'YYYY-MM-DD') || null} 
        onChange={date => setAdrep({ ...adrep, dateUndNum: date },AdrepHeadersService.updateRecord({ 
        ...adrep, dateUndNum: date 
        })) 
        } 
        style={{ width: 560}} 
        allowClear={false} 
      /></pre>
      <pre align = 'left'>Бухгалтер(кассир)    ___________________________________         ___________________________________________________________  <DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(adrep?.dateUnddateUnd, 'YYYY-MM-DD') || null} 
        onChange={date => setAdrep({ ...adrep, dateUnddateUnd: date },AdrepHeadersService.updateRecord({ 
        ...adrep, dateUnddateUnd: date 
        })) 
        } 
        style={{ width: 560}} 
        allowClear={false} 
      /></pre>
      <pre align = 'left'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </pre>
      <pre align = 'left'><strong style={{marginBottom: 36}}>Расписка.</strong> Принят к проверке от <Button style={{ width: 315}}>{adrep?.accepForVer}</Button> авансовый отчёт № <Button style={{ width: 205}}>{adrep?.adrepNum}</Button> от <DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(adrep?.dateUndAdrepNum, 'YYYY-MM-DD') || null} 
        onChange={date => setAdrep({ ...adrep, dateUndAdrepNum: date },AdrepHeadersService.updateRecord({ 
        ...adrep, dateUndAdrepNum: date 
        })) 
        } 
        style={{ width: 560}} 
        allowClear={false} 
      /></pre>
      <pre align = 'left'>          на сумму ___________________________________________________________________________________________________ руб. _________ коп., количество документов <Button style={{ width: 115}}>{adrep?.countOfDoc}</Button> на <Button style={{ width: 115}}>{adrep?.onSheets}</Button> листах</pre>
      <pre align = 'left'>         Бухгалтер ___________________________________         _______________________________________________________________ <DatePicker 
        format="DD.MM.YYYY" 
        value={dayjs(adrep?.dateLast, 'YYYY-MM-DD') || null} 
        onChange={date => setAdrep({ ...adrep, dateLast: date },AdrepHeadersService.updateRecord({ 
        ...adrep, dateLast: date 
        })) 
        } 
        style={{ width: 560}} 
        allowClear={false} 
      /></pre>

    </Space> 

 
    <Table dataSource={list} columns={columns} /> 
    <pre align = 'left'>Подоточное лицо    _____________________________         ________________________________________________________</pre>
   </div> 

 
   <Space> 
    <Button onClick={createRecordHandler}> 
     Создать 
    </Button> 
    <Button type="dashed" onClick={handlePrint}> 
     Печать 
    </Button> 
   </Space> 

 
   <AdrepBodiesDialog 
    visible={visible} 
    onOk={(record) => { 
     currentRecord 
      ? setList(list.map(it => it.id === currentRecord.id 
       ? { ...record } 
       : it)) 
      : setList([...list, record]); 

 
     setCurrentRecord(null); 
     setVisible(false); 
    }} 
    onCancel={() => setVisible(false)} 
    currentRecord={currentRecord} 
    products={products} 
    adrepHeaderId={id} 
   /> 
  </div> 
 ) 

}  