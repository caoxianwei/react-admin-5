/**
 * Created by luwenwei on 17/9/3.
 */
import React from 'react';
import { Button, Divider } from 'antd';
import { getConstantObjectValue } from '../../untils/commonMethods';
import { renderAvatar, renderEnabled, renderTooltip } from '../../untils/renderData';
import moment from 'moment';
let model = {
    getFields:function (context) {
        let self = context;
        return [
            {
                title: 'ID',
                key: 'id',
                sorter:true,/*服务端排序*/
                show:true,
                dataIndex: 'id'
            },
            {
                title: '用户名',
                key: 'username',
                dataIndex: 'username',
                show: true,
            },
            {
                title: '昵称',
                key: 'nickname',
                dataIndex: 'nickname',
                show: true,
                use: true,
                sorter: true,
                edit:true,
                required:true,
                type:'text',
            },
            {
                title: '联系方式',
                key: 'phone',
                dataIndex: 'phone',
                show: true,
                use: true
            },
            {
                title: '性别',
                key: 'sex',
                dataIndex: 'sex',
                edit:true,
                show: true,
                placeholder:'必选',
                type:'select',
                required:true,
                validate: function (record) {
                    if(!record[this.key]) return 'required';
                },
                source:'SexType',
                render: function (val) {
                    return getConstantObjectValue('SexType',val)
                },
            },
            {
                title: '活跃度',
                key: 'activity',
                dataIndex: 'activity',
                show: true
            },
            {
                title: '来源平台',
                key: 'platform',
                dataIndex: 'platform',
                show: true,
                render: function (val) {
                    return getConstantObjectValue('UserPlatform', val);
                },
                edit:true,
                type: 'select',
                source: 'UserPlatform'
            },
            {
                title: '标签',
                key: 'tags',
                dataIndex: 'tags',
                show: true,
                edit:true,
                type:'text',
                render: function (val) {
                    return val;
                }
            },
            {
                title: '关注',
                key: 'enabled',
                dataIndex: 'enabled',
                show: true,
                type:'switch',
                render: function (val) {
                    return renderEnabled(val);
                }
            },
            {
                title: '创建时间',
                key: 'created',
                dataIndex: 'created',
                show: true,
                render: function (val) {
                    return moment(val).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            {
                title: '头像',
                key: 'headimg',
                dataIndex: 'headimg',
                show: true,
                edit:true,
                type:'img',
                uploadBtnText:'上传头像',
                render: (val,record) =>{
                    return renderAvatar(val);
                },
                options: {
                    key: 'headimg',
                    callBack: function (file) {
                        self.uploadFile(file,this.key);
                    }
                }
            },
            {
                title: '操作',
                key: 'action',
                show: true,
                eyeWatch: false,
                style:{width:'20px'},
                render: (text, record) => {
                    return <span>
                        <Button type='primary' size='small' style={{ fontSize: '12px'}} onClick={()=>{self.tableAction.edit(record);}}>编辑</Button>
                        <Divider type="vertical" />
                        <a href={'#/orderRecord/?user='+record.id} target='_blank'>
                            <Button type='primary' size='small' style={{ fontSize: '12px'}}>
                                拼单记录
                            </Button>
                        </a>
                    </span>;
                }
            }
        ];
    }
}

export { model };