import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import OrganizationService from "../../../api/services/organization-service";
import AdrepHeadersService from "../../../api/services/adrep-header-service";
import IndividualService from "../../../api/services/individuals-service";
import { AdrepHeadersDialog } from "../../../components/dialogs/adrep-headers-dialog/AdrepHeadersDialog";
import dayjs from 'dayjs';


export const AdrepListView = ({
    ...props
}) => {
    const columns = [
        {
            title: 'Код',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название организации',
            dataIndex: 'nameOfOrgInd',
            render: (text, record) => organizations.find(it => it.id === record.nameOfOrgInd)?.title,
        },
        {
            title: 'Код ОКПО',
            dataIndex: 'byOKPO',
            key: 'byOKPO',
        },
        {
            title: 'Отчёт в сумме(руб.)',
            dataIndex: 'rubTR',
            key: 'rubTR',
        },
        {
            title: 'Отчёт в сумме(коп.)',
            dataIndex: 'kopTR',
            key: 'kopTR',
        },
        {
            title: 'Номер авансового отчёта',
            dataIndex: 'adrepNum1',
            key: 'adrepNum1',
        },
        {
            title: 'Дата авансового отчёта',
            dataIndex: 'adrepDate',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'Должность руководителя',
            dataIndex: 'postBossIndId',
            render: (text, record) => individuals.find(it => it.id === record.postBossIndId)?.post,
        },
        {
            title: 'Дата подписи руководителя',
            dataIndex: 'dateTR',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'Структурное подразделение',
            dataIndex: 'structDivision',
            key: 'structDivision',
        },
        {
            title: 'Код структурного подразделения',
            dataIndex: 'codeCD',
            key: 'codeCD',
        },
        {
            title: 'Подотчетное лицо',
            dataIndex: 'accountablePerson',
            key: 'accountablePerson',
        },
        {
            title: 'Табельный номер',
            dataIndex: 'serviceNumber',
            key: 'serviceNumber',
        },
        {
            title: 'Профессия (должность)',
            dataIndex: 'postIndId',
            render: (text, record) => individuals.find(it => it.id === record.postIndId)?.post,
        },
        {
            title: 'Назначение аванса',
            dataIndex: 'getAd',
            key: 'getAd',
        },
        {
            title: 'Предыдущий аванс(остаток)',
            dataIndex: 'previousAdBalance',
            key: 'previousAdBalance',
        },
        {
            title: 'Предыдущий аванс(перерасход)',
            dataIndex: 'previousAdOverspending',
            key: 'previousAdOverspending',
        },
        {
            title: 'Получен аванс 1. из кассы',
            dataIndex: 'adFirstBoxOffice',
            key: 'adFirstBoxOffice',
        },
        {
            title: '1а. в валюте (справочно)',
            dataIndex: 'inCurrency',
            key: 'inCurrency',
        },
        {
            title: '2.',
            dataIndex: 'underCurrency2',
            key: 'underCurrency2',
        },
        {
            title: 'Итого получено',
            dataIndex: 'totalReceived',
            key: 'totalReceived',
        },
        {
            title: 'Израсходовано',
            dataIndex: 'usepUP',
            key: 'usepUP',
        },
        {
            title: 'Остаток',
            dataIndex: 'remains',
            key: 'remains',
        },
        {
            title: 'Перерасход',
            dataIndex: 'costOverruns',
            key: 'costOverruns',
        },
        {
            title: 'дебет(счёт,субсчёт)1',
            dataIndex: 'dS1',
            key: 'dS1',
        },
        {
            title: 'дебет(сумма)1',
            dataIndex: 'dSu1',
            key: 'dSu1',
        },
        {
            title: 'кредит(счёт,субсчёт)1',
            dataIndex: 'crS1',
            key: 'crS1',
        },
        {
            title: 'кредит(сумма)1',
            dataIndex: 'crSu1',
            key: 'crSu1',
        },
        {
            title: 'дебет(счёт,субсчёт)2',
            dataIndex: 'dS2',
            key: 'dS2',
        },
        {
            title: 'дебет(сумма)2',
            dataIndex: 'dSu2',
            key: 'dSu2',
        },
        {
            title: 'кредит(счёт,субсчёт)2',
            dataIndex: 'crS2',
            key: 'crS2',
        },
        {
            title: 'кредит(сумма)2',
            dataIndex: 'crSu2',
            key: 'crSu2',
        },
        {
            title: 'Приложение',
            dataIndex: 'application',
            key: 'application',
        },
        {
            title: 'Документов на ... листах',
            dataIndex: 'documentsOn',
            key: 'documentsOn',
        },
        {
            title: 'Остаток внесён/перерасход выдан в сумме(руб.)',
            dataIndex: 'rub2',
            key: 'rub2',
        },
        {
            title: 'Остаток внесён/перерасход выдан в сумме(коп.)',
            dataIndex: 'kop2',
            key: 'kop2',
        },
        {
            title: 'по кассовому ордеру №',
            dataIndex: 'orderNum',
            key: 'orderNum',
        },
        {
            title: 'дата внесения остатка/выдачи перерасхода',
            dataIndex: 'dateUndNum',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'дата подписи бугалтера(кассира)',
            dataIndex: 'dateUnddateUnd',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'Принят к проверке от',
            dataIndex: 'accepForVer',
            key: 'accepForVer',
        },
        {
            title: 'авансовый отчёт №',
            dataIndex: 'adrepNum',
            key: 'adrepNum',
        },
        {
            title: 'дата расписки',
            dataIndex: 'dateUndAdrepNum',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
        },
        {
            title: 'количество документов',
            dataIndex: 'countOfDoc',
            key: 'countOfDoc',
        },
        {
            title: 'количество документов',
            dataIndex: 'onSheets',
            key: 'onSheets',
        },
        {
            title: 'Дата подписи бугалтера',
            dataIndex: 'dateLast',
            render:(text)=>dayjs(text).format('DD.MM.YYYY')
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

    const navigate = useNavigate();
    const [list, setList] = useState([]);
    const [currentRecord, setCurrentRecord] = useState(null);
    const [visible, setVisible] = useState(false);

    const [individuals, setIndividuals] = useState([]);
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const individuals = await IndividualService.getAllRecords();
          const organizations = await OrganizationService.getAllRecords();
          const list = await AdrepHeadersService.getAllRecords();   //CAS   
          setIndividuals(individuals);
          setOrganizations(organizations);
          setList(list);
        } catch (res) {
          alert("Произошла ошибка:", res);
        }
      };
    
      fetchData();
    }, []);
    console.log(list);

    const createRecordHandler = () => {
        setCurrentRecord(null)
        setVisible(true);
    }

    const updateRecordHandler = (record) => {
        setCurrentRecord(record)
        setVisible(true)
    }

    const deleteRecordHandler = async (recordId) => {
        await AdrepHeadersService.removeRecord(recordId);
        setList(list.filter(it => it.id !== recordId));
    }

    return (
        <div style={{ padding: 16 }}>
            <h2 align='center'>Авансовый отчёт</h2>
    <Table
        dataSource={list}
        columns={columns}
        onRow={(record, rowIndex) => ({
            onDoubleClick: event => {
                navigate(`/adrep/${record.id}`);
            },
        })}
    />
            <Button onClick={createRecordHandler}>
                Создать
            </Button>
            <AdrepHeadersDialog
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
                individuals={individuals}
                organizations={organizations}
                
            />
        </div>
    )
}