import React from 'react'
import { connect } from 'react-redux';
import xlsExport from 'xlsexport';

class XLSall extends React.Component {
  render() {

    let dataFromStore = this.props.dataFromStore

    dataFromStore.forEach(item => {
      delete item._index;
      delete item._nestingLevel;
      delete item._original;
      delete item._subRows;
      delete item._viewIndex;
    });

    // for example: value[p]=Low; columnsForCVS = [{ label: 'Low temp', key: 'low' }]
    // value[p] должно совпадать с key
    const preparationForExport = value => {
      try {
        for (let p = 0; p < value.length; p++) {
          if (!this.props[`is${value[p]}Choice`]) {
            dataFromStore.forEach(item => {
               switch (value[p]) {
                case value: delete item.value; break;
                default: console.log('lol')
              }
            });

          }
        }
      }
      catch (e) {
        console.log(e.message)
      }
    }

    preparationForExport(this.props.paramsForExport)

    let xlsDataFromStore = '';
    dataFromStore.length > 0 ? xlsDataFromStore = new xlsExport(dataFromStore) : xlsDataFromStore = new xlsExport([this.props.paramsForExport]);


    return (
      <button
        className="btn btn-primary"
        style={{ whiteSpace: "pre", outline: 'none' }}
        onClick={
          () => xlsDataFromStore.exportToXLS('domains.xls')
        }
      >
        {this.props.label}
      </button>
    )
  }
}

const mapStateToProps = store => {
  // console.log(store)
  return {
    dataFromStore: store.dataAll
  }
}

export default connect(mapStateToProps)(XLSall);