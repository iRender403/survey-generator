import SigleSelect from '@/components/SurveyCom/Materials/SelectComs/SingleSelect'
import TitleEditor from '@/components/SurveyCom/Editor/TitleEditor'
import DescEditor from '@/components/SurveyCom/Editor/DescEditor'
import OptionsEditor from '@/components/SurveyCom/Editor/OptionsEditor'
import PositionEditor from '@/components/SurveyCom/Editor/PositionEditor'
import SizeEditor from '@/components/SurveyCom/Editor/SizeEditor'
import WeightEditor from '@/components/SurveyCom/Editor/WeightEditor'
import ItalicEditor from '@/components/SurveyCom/Editor/ItalicEditor'
import ColorEditor from '@/components/SurveyCom/Editor/ColorEditor'

export const materialComponentMap = {
    'single-select': SigleSelect,
} as const

export const editorComponentMap = {
    'title-editor': TitleEditor,
    'desc-editor': DescEditor,
    'options-editor': OptionsEditor,
    'position-editor': PositionEditor,
    'size-editor': SizeEditor,
    'weight-editor': WeightEditor,
    'italic-editor': ItalicEditor,
    'color-editor': ColorEditor,
} as const

export type MaterialType = keyof typeof materialComponentMap
export type EditorType = keyof typeof editorComponentMap
