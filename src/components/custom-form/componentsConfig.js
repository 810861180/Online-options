import { nameReg, phoneReg, employeeNumReg } from '../../utils/validate'

export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'icon-input',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '请输入'
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '请输入'
    }
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'icon-number',
    options: {
      width: '',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: ''
    }
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'icon-check-box',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'icon-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '请选择时间',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: ''
    }
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '请选择日期',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: ''
    }
  },
  {
    type: 'rate',
    name: '评分',
    icon: 'icon-icon-test',
    options: {
      defaultValue: null,
      max: 5,
      disabled: false,
      allowHalf: false,
      required: false
    }
  },
  {
    type: 'color',
    name: '颜色选择器',
    icon: 'icon-color',
    options: {
      defaultValue: '',
      disabled: false,
      showAlpha: false,
      required: false
    }
  },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: '',
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '请选择',
      required: false,
      showLabel: false,
      width: '',
      options: [
        {
          value: '下拉框1'
        },
        {
          value: '下拉框2'
        }, {
          value: '下拉框3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteFunc: ''
    }
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'icon-switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false
    }
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  }
]

export const advanceComponents = [
  // {
  //   type: 'blank',
  //   name: '自定义',
  //   icon: 'icon-ic',
  //   options: {
  //     defaultType: 'String'
  //   }
  // },
  // {
  //   type: 'imgupload',
  //   name: '图片',
  //   icon: 'icon-tupian',
  //   options: {
  //     defaultValue: [],
  //     size: {
  //       width: 100,
  //       height: 100,
  //     },
  //     width: '',
  //     tokenFunc: 'funcGetToken',
  //     token: '',
  //     domain: 'http://pfp81ptt6.bkt.clouddn.com/',
  //     disabled: false,
  //     length: 8,
  //     multiple: true
  //   }
  // },
  // {
  //   type: 'cascader',
  //   name: '级联选择器',
  //   icon: 'icon-jilianxuanze',
  //   options: {
  //     defaultValue: [],
  //     width: '',
  //     placeholder: '',
  //     disabled: false,
  //     clearable: false,
  //     remote: true,
  //     remoteOptions: [],
  //     props: {
  //       value: 'value',
  //       label: 'label',
  //       children: 'children'
  //     },
  //     remoteFunc: ''
  //   }
  // }
]

export const layoutComponents = [
  {
    type: 'grid',
    name: '栅格布局',
    icon: 'icon-grid-',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top'
    }
  }
]

export const commonComponents = [
  {
    type: 'signupName',
    name: '姓名',
    icon: 'iconperson',
    options: {
      width: '100%',
      defaultValue: '',
      required: true,
      pattern: nameReg.toString(),
      placeholder: '请输入姓名'
    },
    everUsed: false
  },
  {
    type: 'signupPhone',
    name: '手机号',
    icon: 'iconshouji',
    options: {
      width: '100%',
      defaultValue: '',
      required: true,
      placeholder: '请输入手机号',
      pattern: phoneReg.toString()
    },
    everUsed: false
  },
  {
    type: 'gender',
    name: '性别',
    icon: 'iconxingbie',
    options: {
      inline: true,
      defaultValue: '',
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      required: false,
      width: '',
      everUsed: false
    }
  },
  {
    type: 'signupEmail',
    name: '邮箱',
    icon: 'iconyouxiang',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'email',
      placeholder: '请输入邮箱'
    },
    everUsed: false
  },
  {
    type: 'signupCompany',
    name: '公司名称',
    icon: 'icongongsi',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入公司名称'
    },
    everUsed: false
  },
  {
    type: 'signupPost',
    name: '职位',
    icon: 'iconzhiweishenfen',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入职位'
    },
    everUsed: false
  },
  {
    type: 'employeeNum',
    name: '工号',
    icon: 'icongonghao',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入工号',
      pattern: employeeNumReg.toString()
    },
    everUsed: false
  },
  {
    type: 'companyAddr',
    name: '公司地址',
    icon: 'icongongsidizhi',
    options: {
      defaultValue: [],
      placeholder: '请选择公司地址',
      disabled: false,
      required: false,
      clearable: false,
      width: '100%',
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      detailsAddress: true,
      detailsAddressDesc: ''
    },
    everUsed: false
  },
  {
    type: 'homeAddress',
    name: '家庭住址',
    icon: 'iconziyuan',
    options: {
      defaultValue: [],
      placeholder: '请选择家庭住址',
      disabled: false,
      required: false,
      clearable: false,
      width: '100%',
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      detailsAddress: true,
      detailsAddressDesc: ''
    },
    everUsed: false
  }
]

export const Sign = [
  {
    type: 'signupName',
    name: '姓名',
    icon: 'iconperson',
    options: {
      width: '100%',
      defaultValue: '',
      required: true,
      pattern: nameReg.toString(),
      placeholder: '请输入姓名'
    },
    everUsed: false
  },
  {
    type: 'signupPhone',
    name: '手机号',
    icon: 'iconshouji',
    options: {
      width: '100%',
      defaultValue: '',
      required: true,
      placeholder: '请输入手机号',
      pattern: phoneReg.toString()
    },
    everUsed: false
  },
  {
    type: 'gender',
    name: '性别',
    icon: 'iconxingbie',
    options: {
      inline: true,
      defaultValue: '',
      options: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      required: false,
      width: '',
      everUsed: false
    }
  },
  {
    type: 'signupEmail',
    name: '邮箱',
    icon: 'iconyouxiang',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'email',
      placeholder: '请输入邮箱'
    },
    everUsed: false
  },
  {
    type: 'signupCompany',
    name: '公司名称',
    icon: 'icongongsi',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入公司名称'
    },
    everUsed: false
  },
  {
    type: 'signupPost',
    name: '职位',
    icon: 'iconzhiweishenfen',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入职位'
    },
    everUsed: false
  },
  {
    type: 'employeeNum',
    name: '工号',
    icon: 'icongonghao',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入工号',
      pattern: employeeNumReg.toString()
    },
    everUsed: false
  },
  {
    type: 'companyAddr',
    name: '公司地址',
    icon: 'icongongsidizhi',
    options: {
      defaultValue: [],
      placeholder: '请选择公司地址',
      disabled: false,
      required: false,
      clearable: false,
      width: '100%',
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      detailsAddress: true,
      detailsAddressDesc: ''
    },
    everUsed: false
  },
  {
    type: 'homeAddress',
    name: '家庭住址',
    icon: 'iconziyuan',
    options: {
      defaultValue: [],
      placeholder: '请选择家庭住址',
      disabled: false,
      required: false,
      clearable: false,
      width: '100%',
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      detailsAddress: true,
      detailsAddressDesc: ''
    },
    everUsed: false
  }
]

export const Questionaire = [
  {
    type: 'signupName',
    name: '姓名',
    icon: 'iconperson',
    options: {
      width: '100%',
      defaultValue: '',
      required: true,
      pattern: nameReg.toString(),
      placeholder: '请输入姓名'
    },
    everUsed: false
  },
  {
    type: 'signupPhone',
    name: '手机号',
    icon: 'iconshouji',
    options: {
      width: '100%',
      defaultValue: '',
      required: true,
      placeholder: '请输入手机号',
      pattern: phoneReg.toString()
    },
    everUsed: false
  },
  {
    type: 'gender',
    name: '性别',
    icon: 'iconxingbie',
    options: {
      inline: true,
      defaultValue: '',
      options: [
        {
          value: 'male',
          label: '男'
        },
        {
          value: 'femal',
          label: '女'
        }
      ],
      required: false,
      width: '',
      everUsed: false
    }
  },
  {
    type: 'signupEmail',
    name: '邮箱',
    icon: 'iconyouxiang',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      dataType: 'email',
      placeholder: '请输入邮箱'
    },
    everUsed: false
  },
  {
    type: 'signupCompany',
    name: '公司名称',
    icon: 'icongongsi',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入公司名称'
    },
    everUsed: false
  },
  {
    type: 'signupPost',
    name: '职位',
    icon: 'iconzhiweishenfen',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入职位'
    },
    everUsed: false
  },
  {
    type: 'employeeNum',
    name: '工号',
    icon: 'icongonghao',
    options: {
      width: '100%',
      defaultValue: '',
      required: false,
      placeholder: '请输入工号',
      pattern: employeeNumReg.toString()
    },
    everUsed: false
  },
  {
    type: 'companyAddr',
    name: '公司地址',
    icon: 'icongongsidizhi',
    options: {
      defaultValue: [],
      placeholder: '请选择公司地址',
      disabled: false,
      required: false,
      clearable: false,
      width: '100%',
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      detailsAddress: true,
      detailsAddressDesc: ''
    },
    everUsed: false
  },
  {
    type: 'homeAddress',
    name: '家庭住址',
    icon: 'iconziyuan',
    options: {
      defaultValue: [],
      placeholder: '请选择家庭住址',
      disabled: false,
      required: false,
      clearable: false,
      width: '100%',
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      detailsAddress: true,
      detailsAddressDesc: ''
    },
    everUsed: false
  }
]
