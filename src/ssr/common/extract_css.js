import React from 'react';


export const RenderHoc = css => WrappedComponent => class extends WrappedComponent{
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.staticContext) {
            this.props.staticContext.insertCss(css);
        }
    }
    render() {
        return super.render();
    }
};