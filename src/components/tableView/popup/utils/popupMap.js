import { Select, Input, Date, Image, Radio } from '../../..//utils/type/index.js'
const popupMap = function (h, params) {
  const component = searchNode[params.popup.type]
  return component && component.call(this, h, params, 'popup')
}

const searchNode = {
  'select': Select,
  'input': Input,
  'date': Date,
  'image': Image,
  'radio': Radio
}

export default popupMap
