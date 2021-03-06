import React from 'react'
import { useDispatch } from 'react-redux';
import { ParamKey } from '../../engine/params';
import { useTypedSelector } from '../../redux/store'
import { setModulation } from '../../redux/scenesSlice'


export default function ModulationMatrix() {

  const paramsModulation = useTypedSelector(state => state.params.modulation)
  const modulators = useTypedSelector(state => state.modulators)
  const dispatch = useDispatch()

  const styles: { [key: string]: React.CSSProperties } = {
    table: {
      margin: '1rem',
      border: '1px solid black',
      borderCollapse: 'collapse',
    },
    activeCell: {
      width: '1rem',
      height: '1rem',
      margin: '0.2rem',
      backgroundColor: '#fff8',
    },
    cell: {
      width: '1rem',
      height: '1rem',
      margin: '0.2rem'
    }
  }

  function setParamModulation(param: ParamKey, modulatorIndex: number | null) {
    return () => {
      dispatch(setModulation({param: param, modulatorIndex: modulatorIndex}))
    }
  }

  function getRow([param, modulatorIndex]: [ParamKey, number | null]) {
    const paramMods = Array(modulators.length).fill(false)
    if (modulatorIndex !== null) paramMods[modulatorIndex] = true

    return (
      <tr key={param}>
        <td>{param}</td>
        {paramMods.map((isModded, index) => {
          return (
            <td key={index}>
              <div
                onClick={setParamModulation(param, isModded ? null : index)}
                style={isModded ? styles.activeCell : styles.cell}
              ></div>
            </td>
          )
        })}
      </tr>
    )
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>_</th>{modulators.map((_, index) => (<th key={index}>{index}</th>))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(paramsModulation).map(getRow)}
      </tbody>
    </table>
  )
}