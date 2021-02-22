import React from 'react'
import { useTypedSelector } from '../redux/store'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { setActiveScene, addScene, removeScene } from '../redux/scenesSlice'
import { nanoid } from 'nanoid'
import { initScene } from '../engine/scene_t'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add';
  
const height = 6
const width = 6

const useStyles = makeStyles({
  root: {
    height: `${height}rem`,
    padding: '0.5rem',
    minWidth: `${width}rem`,
    marginRight: '0.3rem',
    marginBottom: '0.3rem',
    color: "#fff8",
    backgroundColor: '#fff2',
    cursor: 'pointer'
  },
  selected: {
    padding: '0.4rem',
    border: '0.1rem solid #fffa',
    color: '#fffc'
  }
})

function Scene({ index, id }: { index: number, id: string }) {
  const classes = useStyles()
  const isSelected = useTypedSelector(state => state.scenes.active === id)
  const dispatch = useDispatch()
  return (
    <div className={`${classes.root} ${isSelected ? classes.selected : null}`} onClick={() => { dispatch(setActiveScene(id))} }>
      Scene {index + 1}
      <br />
      {id.substring(0, 3)}
      { isSelected ? null : (
        <IconButton aria-label="delete" size="small" onClick={e => {
          e.stopPropagation()
          dispatch(removeScene({ index: index }))
        }}>
          <CloseIcon />
        </IconButton>
      )}
    </div>
  )
}

function NewScene() {
  const classes = useStyles()
  const dispatch = useDispatch()
  return (
    <div className={classes.root} onClick={() => dispatch(addScene({ id: nanoid(), scene: initScene() }))}>
      <AddIcon />
    </div>
  )
}

let array = Array.from(Array(5).keys())

export default function SceneSelection() {
  const sceneIds = useTypedSelector(state => state.scenes.ids)

  return (
    <div style={{ backgroundColor: '#0006', padding: '0.5rem'}}>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Scenes</div>
      <div style={{ display: 'flex' }}>
        {sceneIds.map((id, index) => {
          return (
            <Scene key={index} index={index} id={id} />
          )
        })}
        <NewScene />
      </div>
    </div>
  )
}
