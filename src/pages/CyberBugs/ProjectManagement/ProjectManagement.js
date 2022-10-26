import React, { useState, useEffect } from 'react';
import {
  AutoComplete, Button, Popover, Space, Table, Tag, Avatar,
  Popconfirm, message,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { NavLink } from 'react-router-dom';
import FormEditProject from '../../../components/Forms/FormEditProject/FromEditProject';

export default function ProjectManagement(props) {
  // Lấy dữ liệu từ reducer về component
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList,
  );

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer,
  );

  const [value, setValue] = useState('');

  // Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    dispatch({ type: 'GET_LIST_PROJECT_SAGA' });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      sorter: (item2, item1) => item2.id - item1.id,
      sortDirections: ['descend'],
    },
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      render: (text, record, index) => (
        <NavLink to={`/projectdetail/${record.id}`}>
          {' '}
          {text}
        </NavLink>
      ),
      sorter: (item2, item1) => {
        const projectName1 = item1.projectName?.trim().toLowerCase();
        const projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: 'category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (item2, item1) => {
        const categoryName1 = item1.categoryName?.trim().toLowerCase();
        const categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'creator',

      key: 'creator',
      render: (text, record, index) => <Tag color="green">{record.creator?.name}</Tag>,
      sorter: (item2, item1) => {
        const creator1 = item1.creator?.name.trim().toLowerCase();
        const creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: 'members',
      key: 'members',
      render: (text, record, index) => (
        <div>
          {record.members?.slice(0, 3).map((member, index) => (
            <Popover
              key={index}
              placement="top"
              title="members"
              content={() => (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>avatar</th>
                      <th>name</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {record.members?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.userId}</td>
                        <td>
                          <img
                            src={item.avatar}
                            width="30"
                            height="30"
                            style={{ borderRadius: '15px' }}
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <button
                            onClick={() => {
                              dispatch({
                                type: 'REMOVE_USER_PROJECT_API',
                                userProject: {
                                  userId: item.userId,
                                  projectId: record.id,
                                },
                              });
                            }}
                            className="btn btn-danger"
                            style={{ borderRadius: '50%' }}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            >
              <Avatar key={index} src={member.avatar} />
            </Popover>
          ))}

          {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}

          <Popover
            placement="rightBottom"
            title="Add user"
            content={() => (
              <AutoComplete
                options={userSearch?.map((user, index) => ({
                  label: user.name,
                  value: user.userId.toString(),
                }))}
                value={value} // value label mỗi lần setState cập nhập lại
                onChange={(text) => {
                  setValue(text);
                }}
                // value người dùng chọn
                onSelect={(valueSelect, option) => {
                  // set giá trị của hộp thọai = option.label
                  setValue(option.label);
                  // Gọi api gửi về backend
                  dispatch({
                    type: 'ADD_USER_PROJECT_API',
                    userProject: {
                      // giá trị ứng với backend
                      projectId: record.id,
                      userId: valueSelect,
                    },
                  });
                }}
                style={{ width: '100%' }}
                onSearch={(value) => {
                  dispatch({
                    type: 'GET_USER_API',
                    keyWord: value,
                  });
                }}
              />
            )}
            trigger="click"
          >
            <Button style={{ borderRadius: '50%' }}>+</Button>
          </Popover>
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-1 btn-primary"
              style={{ fontSize: 5 }}
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  title: "Edit Project",
                  Component: <FormEditProject />,
                };

                //dispatch lên reducer nội dung drawer
                dispatch(action);
                //dispatch dữ liệu dòng hiện tai lên reducer
                const actionEditProject = {
                  type: "EDIT_PROJECT",
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <EditOutlined style={{ fontSize: 13 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PROJECT_SAGA",
                  idProject: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger" style={{ fontSize: 5 }}>
                <DeleteOutlined style={{ fontSize: 13 }} />
              </button>
            </Popconfirm>
            ,
          </div>
        );
      },
    },
  ];
  return (
    <div className="container-fluid mt-5">
      <h3>Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={projectList}
        onChange={handleChange}
        className="ProjectManagementTable"
      />
    </div>
  );
}
