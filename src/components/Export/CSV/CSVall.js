import React from 'react'
import { connect } from 'react-redux';
import { CSVLink } from "react-csv";

class CSVall extends React.Component {
  render() {


    let columnsForCVS = this.props.columnsForCVS
    let dataFromStore = this.props.dataFromStore

    // console.log(dataFromStore);

    dataFromStore.forEach(item => {
      delete item._index;
      delete item._nestingLevel;
      delete item._original;
      delete item._subRows;
      delete item._viewIndex;
    });

    const removeItemInColumnsForCVS = (key, value) => {
      if (value === undefined)
        return;

      for (let i in columnsForCVS) {
        if (columnsForCVS[i][key] === value) {
          columnsForCVS.splice(i, 1);
        }
      }
    };

    // for example: value[p]=Low; columnsForCVS = [{ label: 'Low temp', key: 'low' }]
    // value[p] должно совпадать с key
    const preparationForExport = value => {
      try {
        for (let p = 0; p < value.length; p++) {
          if (!this.props[`is${value[p]}Choice`]) {
            dataFromStore.forEach(item => {
              switch (value[p]) {
                case value: delete item.value; break;
                default: break;
              }
            });

            columnsForCVS.forEach(item => {
              if (item.label.includes(value[p])) {
                removeItemInColumnsForCVS("key", value[p].toLowerCase());
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

    return (
      <CSVLink
        filename={"domains.csv"}
        data={dataFromStore}
        headers={columnsForCVS}
        className="btn btn-primary"
        style={{ whiteSpace: "pre", outline: 'none' }}
      >
        {this.props.label}
      </CSVLink>
    )
  }
}

const mapStateToProps = store => {
  // console.log(store.dataAll)
  return {
    dataFromStore: store.dataAll
  }
}

export default connect(mapStateToProps)(CSVall);