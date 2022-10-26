import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_ADMIN_SAGA,
  EDIT_USER_ADMIN_MODAL,
  GET_USER_ADMIN_SAGA,
  OPEN_FORM_EDIT_USER_ADMIN,
  SEARCH_USER_ADMIN,
} from "../../../redux/constants/Cyberbugs/UserConstants";

import {
  Table,
  Button,
  Space,
  Popover,
  Avatar,
  Image,
  AutoComplete,
} from "antd";

import { Tag, Divider } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import FormEditUserAdmin from "../../../components/Forms/FormEditUserAdmin/FormEditUserAdmin";

export default function UserAdmin(props) {
  const dispatch = useDispatch();
  const { arrUserAdmin } = useSelector((state) => state.UserAdminReducer);
  const { userSearchAdmin } = useSelector((state) => state.UserAdminReducer);
  const [value, setValue] = useState("");

  //hàm search
  const searchRef = useRef(null);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const handleChange = (pagination, filters, sorter) => {
    
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    dispatch({
      type: GET_USER_ADMIN_SAGA,
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      key: "userId",
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",

      sorter: (item2, item1) => {
        let name2 = item2.name?.trim().toLowerCase();
        let name1 = item1.name?.trim().toLowerCase();
        console.log("name2", name2);
        if (name2 < name1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        console.log("text", text);

        return (
          <div key={index} className="avatar">
            <img
              src={record.avatar}
              alt={record.avatar}
              style={{ width: 40, height: 40 }}
            />
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record, index) => {
        return (
          <Tag key={index} color="red">
            {record.email}
          </Tag>
        );
      },
      sorter: (item2, item1) => {
        let creator2 = item2.creator?.name.trim().toLowerCase();
        let creator1 = item1.creator?.name.trim().toLowerCase();
        console.log("creator2", creator2);
        if (creator2 < creator1) {
          return -1;
        } else {
          return 1;
        }
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div key={index}>
            <button
              style={{ fontSize: 5 }}
              className="btn btn-primary mr-1"
              onClick={() => {
                dispatch({
                  type: OPEN_FORM_EDIT_USER_ADMIN,
                  visible: true,
                  title: "Edit User",
                  Component: <FormEditUserAdmin></FormEditUserAdmin>,
                });

                dispatch({
                  type: EDIT_USER_ADMIN_MODAL,
                  userEditModal: record,
                });
              }}
            >
              <EditOutlined style={{ fontSize: 13 }} />
            </button>

            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_USER_ADMIN_SAGA,
                  userId: record.userId,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger" style={{ fontSize: 5 }}>
                <DeleteOutlined style={{ fontSize: 13 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container bg-glass">
      <h3 className="mt-md-3 mt-sm-1">User Management</h3>
      <AutoComplete
        className="mb-2"
        options={arrUserAdmin?.map((user, index) => {
          return {
            label: user.name,
            value: user.userId.toString(),
          };
        })}
        value={value}
        //value nhận vào state value ở hàm useState phía trên

        onChange={(valueSelect) => {
          setValue(valueSelect);
        }}
        //onSelect để chọn member dựa vào user.userId
        onSelect={(valueSelect, options) => {
          //set giá trị input
          setValue(options.label);

          dispatch({
            type: SEARCH_USER_ADMIN,
            userSearch: valueSelect,
          });
        }}
        style={{ width: 200 }}
        placeholder="Search your username"
        // onSearch mỗi lần search sẽ call api về
        onSearch={(value) => {
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }

          searchRef.current = setTimeout(() => {
            dispatch({
              type: GET_USER_ADMIN_SAGA,
              keyWord: value,
            });
          }, 300);
        }}
      />

      <Table
        className="bg-glass"
        rowKey={"id"}
        columns={columns}
        dataSource={arrUserAdmin}
        onChange={handleChange}
      />
    </div>
  );
}
