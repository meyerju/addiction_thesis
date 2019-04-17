import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import classes from './DragAndDrop.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class DragAndDrop extends Component {
    state = {
        drag: false
    }
    dropRef = React.createRef()

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ drag: true })
    }

    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({ drag: false })
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.handleDrop(e.dataTransfer.files)
    }

    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('drop', this.handleDrop)
    }
    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        return (
            <div className={classes.Drag} ref={this.dropRef}>
                {this.state.drag &&
                    <div className={classes.Dragging}  >
                        <div className={classes.Dragging_content}>
                            <div>drop here :)</div>
                        </div>
                    </div>
                }
                <CloudUploadIcon className={classes.icon} />
                <span className={classes.drag}>Drag and Drop your csv file here.</span>
                <ReactFileReader handleFiles={this.props.handleFiles} fileTypes={'.xlsx'}>
                    <React.Fragment>
                        <span className={classes.browse}>Or </span>
                        <input type="file" className={classes.browse__button} onChange={this.props.onChange} />
                    </React.Fragment>
                </ReactFileReader>
            </div>
        )
    }
}

export default DragAndDrop;