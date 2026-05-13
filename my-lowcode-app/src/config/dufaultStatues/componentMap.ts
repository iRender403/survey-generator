import SigleSelect from '@/components/SurveyCom/Materials/SelectComs/SingleSelect';
import MultiSelect from '@/components/SurveyCom/Materials/SelectComs/MultiSelect';
import OptionSelect from '@/components/SurveyCom/Materials/SelectComs/OptionSelect';
import SinglePicSelect from '@/components/SurveyCom/Materials/SelectComs/SinglePicSelect';
import MultiPicSelect from '@/components/SurveyCom/Materials/SelectComs/MultiPicSelect';
import TitleEditor from '@/components/SurveyCom/Editor/TitleEditor';
import DescEditor from '@/components/SurveyCom/Editor/DescEditor';
import OptionEditor from '@/components/SurveyCom/Editor/OptionEditor';
import PositionEditor from '@/components/SurveyCom/Editor/PositionEditor';
import SizeEditor from '@/components/SurveyCom/Editor/SizeEditor';
import WeightEditor from '@/components/SurveyCom/Editor/WeightEditor';
import ItalicEditor from '@/components/SurveyCom/Editor/ItalicEditor';
import ColorEditor from '@/components/SurveyCom/Editor/ColorEditor';
import OptionPicEditor from '@/components/SurveyCom/Editor/OptionPicEditor';

export const materialComponentMap = {
  'single-select': SigleSelect,
  'multi-select': MultiSelect,
  'option-select': OptionSelect,
  'single-pic-select': SinglePicSelect,
  'multi-pic-select': MultiPicSelect,
} as const;

export const editorComponentMap = {
  'title-editor': TitleEditor,
  'desc-editor': DescEditor,
  'options-editor': OptionEditor,
  'position-editor': PositionEditor,
  'size-editor': SizeEditor,
  'weight-editor': WeightEditor,
  'italic-editor': ItalicEditor,
  'color-editor': ColorEditor,
  'options-pic-editor': OptionPicEditor,
} as const;

export type MaterialType = keyof typeof materialComponentMap;
export type EditorType = keyof typeof editorComponentMap;
