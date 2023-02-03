import { Select, Input, Date, Image, Radio } from '../../../utils/type/index'
const searchMap = function (h, params) {
  if (params.tableShow) {
    return null
  }
  const component = searchNode[params.search?.type]
  return component && component.call(this, h, params, 'search')
}

const searchNode = {
  'select': Select,
  'input': Input,
  'date': Date,
  'image': Image,
  'radio': Radio
}

export default searchMap
