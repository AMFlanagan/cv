import React, {Component} from 'react';
import * as d3 from 'd3';

class ProgressArc extends Component {
    displayName: 'ProgressArc';

    // ProTypes added to make the component dynamic
    propTypes: {
        id: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
        backgroundColor: PropTypes.string,
        foregroundColor: PropTypes.string,
        percentComplete: PropTypes.number
    }

    // When the component first mounts,
    componentDidMount() {
        this.drawArc();
    }

    // On update redraw the arc
    componentDidUpdate() {
        this.redrawArc();
    }

    //Redrawing the arc requires removing the old arc and drawing a new one
    redrawArc() {
        const context = d3.select(`#${this.props.id}`);
        context.remove();
        this.drawArc();
    }

    // Draw arc in the first place
    drawArc() {
        const context = this.setContext();
        this.setBackground(context);
        this.setForeground(context);
        this.updatePercent(context);
    }

    updatePercent(context) {
        return this.setForeground(context)
            .transition()
            .duration(this.props.duration)
            .call(this.arcTween, (Math.PI * 2) * this.props.percentComplete, this.arc());
    }

    arcTween(transition, newAngle, arc) {
        transition.attrTween('d', (d) => {
            const interpolate = d3.interpolate(d.endAngle, newAngle);
            const newArc = d;
            return (t) => {
                newArc.endAngle = interpolate(t);
                return arc(newArc);
            };
        });
    }

    // This selects the DOM element and creates a svg element to get groovy in
    setContext() {
        const {height, width, id} = this.props;
        return d3.select(this.refs.arc)
            .append('svg')
            .attr('height', height)
            .attr('width', width)
            .attr('id', id)
            .append('g')
            .attr('transform', `translate(${height / 2}, ${width / 2})`);
    }

    // Set background, size, colour, shape etc
    // Datum tells us where the path ends
    setBackground(context) {
        return context.append('path')
            .datum({endAngle: (Math.PI * 2)})
            .style('fill', this.props.backgroundColor)
            .attr('d', this.arc());
    }

    // Set foreground, size, colour, shape etc
    // Datum tells us where the path ends
    setForeground(context) {
        return context.append('path')
            .datum({ endAngle: 0 })
            .style('fill', this.props.foregroundColor)
            .attr('d', this.arc());
    }


    arc() {
        return d3.arc()
            .innerRadius(this.props.innerRadius)
            .outerRadius(this.props.outerRadius)
            .startAngle(0)
    }

    render() {
        return (<div ref="arc"></div>)
    }
}

export default ProgressArc;
