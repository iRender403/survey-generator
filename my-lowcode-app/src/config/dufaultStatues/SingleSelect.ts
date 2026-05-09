
// 这里使用函数的作用主要是为了隔绝对象
// 如果使用对象来做的话,可能会导致全局的数据跟着变化,造成不同组件之间的数据联系
import { v4 as uuidv4 } from 'uuid'
import SigleSelect from '@/components/SurveyCom/Materials/SelectComs/SingleSelect'
import TitleEditor from '@/components/SurveyCom/Editor/TitleEditor'
import DescEditor from '@/components/SurveyCom/Editor/DescEditor'
import OptionsEditor from '@/components/SurveyCom/Editor/OptionsEditor'
import PositionEditor from '@/components/SurveyCom/Editor/PositionEditor'
import SizeEditor from '@/components/SurveyCom/Editor/SizeEditor'
import WeightEditor from '@/components/SurveyCom/Editor/WeightEditor'
import ItalicEditor from '@/components/SurveyCom/Editor/ItalicEditor'
import ColorEditor from '@/components/SurveyCom/Editor/ColorEditor'


export default function () {
    return {
        type: SigleSelect,
        name: 'single-select',
        id: uuidv4(),
        // 组件的状态：组件的每一个能够修改的状态都应该对应一个编辑组件
        status: {
            // 标题
            title: {
                id: uuidv4(),
                status: '单选题默认标题',
                isShow: true,
                name: 'title-editor',
                editCom: TitleEditor,
            },
            // 描述
            desc: {
                id: uuidv4(),
                status: '单选题默认描述',
                isShow: true,
                name: 'desc-editor',
                editCom: DescEditor,
            },  
            // 选项
            options: {
                id: uuidv4(),
                status: ['默认选项1', '默认选项2'],
                currentStatus: 0,
                isShow: true,
                name: 'options-editor',
                editCom: OptionsEditor,
            },
            // 位置
            position: {
                id: uuidv4(),
                currentStatus: 0,
                status: ['左对齐', '居中对齐'],
                isShow: true,
                name: 'position-editor',
                editCom: PositionEditor,
            },
            // 标题大小
            titleSize: {
                id: uuidv4(),
                currentStatus: 0,
                status: ['22', '20', '18'],
                isShow: true,
                name: 'size-editor',
                editCom: SizeEditor,
            },
            // 描述大小
            descSize: {
                id: uuidv4(),
                currentStatus: 0,
                status: ['16', '14', '12'],
                isShow: true,
                name: 'size-editor',
                editCom: SizeEditor,
            },
            // 标题加粗
            titleWeight: {
                id: uuidv4(),
                currentStatus: 1,
                status: ['加粗', '正常'],
                isShow: true,
                name: 'weight-editor',
                editCom: WeightEditor,
            },
            // 描述加粗
            descWeight: {
                id: uuidv4(),
                currentStatus: 1,
                status: ['加粗', '正常'],
                isShow: true,
                name: 'weight-editor',
                editCom: WeightEditor,
            },
            // 标题斜体
            titleItalic: {
                id: uuidv4(),
                currentStatus: 1,
                status: ['斜体', '正常'],
                isShow: true,
                name: 'italic-editor',
                editCom: ItalicEditor,
            },
            // 描述斜体
            descItalic: {
                id: uuidv4(),
                currentStatus: 1,
                status: ['斜体', '正常'],
                isShow: true,
                name: 'italic-editor',
                editCom: ItalicEditor,
            },
            // 标题颜色
            titleColor: {
                id: uuidv4(),
                status: '#000',
                isShow: true,
                name: 'color-editor',
                editCom: ColorEditor,
            },
            // 描述颜色
            descColor: {
                id: uuidv4(),
                status: '#909399',
                isShow: true,
                name: 'color-editor',
                editCom: ColorEditor,
            },
        },
    };
}