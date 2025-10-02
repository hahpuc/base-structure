import { Component, Injector, OnInit, AfterViewInit } from '@angular/core';
import { dia, shapes, dia as jointDia, elementTools } from '@joint/core';

import { AppBaseComponent } from '@/app/shared/app.base.component';

@Component({
  standalone: false,
  templateUrl: './flow-joint.component.html',
})
export class FlowJointComponent extends AppBaseComponent implements OnInit, AfterViewInit {
  protected cursor = 'grab';
  private paper!: dia.Paper;
  private graph!: dia.Graph;

  selectedShape: dia.Element | null = null;
  selectedShapeType: string = '';
  private dragShapeType: string | null = null;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.setPageTitle('Flow Joint');
    this.setHeaderButtons([
      {
        title: 'Get',
        icon: 'ki-outline ki-check',
        type: 'primary',
        visible: true,
        click: () => {
          if (this.graph) {
            // Output the graph as JSON to the console
            console.log('Graph JSON:', this.graph.toJSON());
          } else {
            console.warn('Graph is not initialized.');
          }
        },
      },
    ]);
  }

  ngAfterViewInit(): void {
    const shapeNamespace = { ...shapes };

    this.graph = new dia.Graph({}, { cellNamespace: shapeNamespace });
    this.paper = new dia.Paper({
      el: document.getElementById('paper-container'),
      model: this.graph,
      width: 900,
      height: 500,
      background: { color: '#fafafa' },
      gridSize: 20,
      drawGrid: {
        name: 'dot', // Options: 'dot', 'mesh', 'doubleMesh', 'fixedDot'
        args: [
          { color: '#d3d3d3', thickness: 2 }, // line 1
          { color: '#f0f0f0', thickness: 2, scaleFactor: 5 }, // line 2 (if doubleMesh)
        ],
      },
      cellViewNamespace: shapes,
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      defaultConnectionPoint: {
        name: 'boundary',
        args: {
          offset: 2,
        },
      },
      defaultConnector: {
        name: 'rounded',
        args: { radius: 16 },
      },
      labelsLayer: true,
      // defaultRouter: this.orthogonalRouter,
      clickThreshold: 10,
      moveThreshold: 10,
    });

    this.drawStartEnd();
    this.handleLinkTools();
  }

  drawStartEnd(): void {
    // Create start and end circles
    const startCircle = new shapes.standard.Circle();
    startCircle.position(40, 200);
    startCircle.resize(60, 60);
    startCircle.attr({
      body: { fill: '#22c55e', stroke: '#15803d', strokeWidth: 2 },
      label: { text: 'Start', fill: '#fff', fontWeight: 'bold' },
    });
    startCircle.addTo(this.graph);

    const endCircle = new shapes.standard.Circle();
    endCircle.position(800, 200);
    endCircle.resize(60, 60);
    endCircle.attr({
      body: { fill: '#ef4444', stroke: '#991b1b', strokeWidth: 2 },
      label: { text: 'End', fill: '#fff', fontWeight: 'bold' },
    });
    endCircle.addTo(this.graph);
  }

  handleLinkTools(): void {
    // Listen for shape selection and show link tool
    this.paper.on('element:pointerclick', (elementView: dia.ElementView) => {
      this.selectedShape = elementView.model;
      this.selectedShapeType = elementView.model.get('type') || 'Unknown';

      // Remove tools from all elements
      this.paper.model.getElements().forEach(el => {
        const view = this.paper.findViewByModel(el);
        if (view) view.removeTools();
      });

      // Add link tool to selected element
      const connectTool = new elementTools.Connect({
        x: '100%',
        y: '50%',
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attributes: {
              r: 10,
              fill: '#6366f1',
              cursor: 'pointer',
              stroke: '#fff',
              'stroke-width': 2,
            },
          },
        ],
      });
      elementView.addTools(new dia.ToolsView({ tools: [connectTool] }));
    });

    // Deselect when clicking on blank area and remove tools
    this.paper.on('blank:pointerclick', () => {
      this.selectedShape = null;
      this.selectedShapeType = '';
      this.paper.model.getElements().forEach(el => {
        const view = this.paper.findViewByModel(el);
        if (view) view.removeTools();
      });
    });
  }

  // Called from template on dragstart
  onToolboxDragStart(type: string, dragEvent: DragEvent) {
    this.dragShapeType = type;
    if (dragEvent.dataTransfer) {
      dragEvent.dataTransfer.effectAllowed = 'copy';
      dragEvent.dataTransfer.setData('text/plain', type); // Required for Firefox
    }
  }

  public onPaperDrop(event: DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer?.getData('text/plain') || this.dragShapeType;
    if (!type) return;

    const paperContainer = document.getElementById('paper-container');
    if (!paperContainer) return;

    const rect = paperContainer.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (type === 'rectangle') {
      const rectShape = new shapes.standard.Rectangle();
      rectShape.position(x - 90, y - 25);
      rectShape.resize(180, 50);
      rectShape.attr('body', { stroke: '#C94A46', rx: 2, ry: 2 });
      rectShape.attr('label', { text: 'Action', fill: '#353535' });
      rectShape.addTo(this.graph);
    } else if (type === 'polygon') {
      const polygon = new shapes.standard.Polygon();
      polygon.position(x - 60, y - 30);
      polygon.resize(120, 60);
      polygon.attr({
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
          stroke: '#1e40af',
        },
        label: { text: 'Condition', fill: '#353535' },
      });
      polygon.addTo(this.graph);
    }
    this.dragShapeType = null;
  }

  orthogonalRouter(vertices: any[], opt: any, linkView: any) {
    const sourceBBox = linkView.sourceBBox;
    const targetBBox = linkView.targetBBox;
    const sourcePoint = linkView.sourceAnchor;
    const targetPoint = linkView.targetAnchor;
    const { x: tx0, y: ty0 } = targetBBox;
    const { x: sx0, y: sy0 } = sourceBBox;
    const sourceOutsidePoint = sourcePoint.clone();
    const spacing = 28;
    const sourceSide = sourceBBox.sideNearestToPoint(sourcePoint);
    switch (sourceSide) {
      case 'left':
        sourceOutsidePoint.x = sx0 - spacing;
        break;
      case 'right':
        sourceOutsidePoint.x = sx0 + sourceBBox.width + spacing;
        break;
      case 'top':
        sourceOutsidePoint.y = sy0 - spacing;
        break;
      case 'bottom':
        sourceOutsidePoint.y = sy0 + sourceBBox.height + spacing;
        break;
    }
    const targetOutsidePoint = targetPoint.clone();
    const targetSide = targetBBox.sideNearestToPoint(targetPoint);
    switch (targetSide) {
      case 'left':
        targetOutsidePoint.x = targetBBox.x - spacing;
        break;
      case 'right':
        targetOutsidePoint.x = targetBBox.x + targetBBox.width + spacing;
        break;
      case 'top':
        targetOutsidePoint.y = targetBBox.y - spacing;
        break;
      case 'bottom':
        targetOutsidePoint.y = targetBBox.y + targetBBox.height + spacing;
        break;
    }

    const { x: sox, y: soy } = sourceOutsidePoint;
    const { x: tox, y: toy } = targetOutsidePoint;
    const tx1 = tx0 + targetBBox.width;
    const ty1 = ty0 + targetBBox.height;
    const tcx = (tx0 + tx1) / 2;
    const tcy = (ty0 + ty1) / 2;
    const sx1 = sx0 + sourceBBox.width;
    const sy1 = sy0 + sourceBBox.height;

    if (sourceSide === 'left' && targetSide === 'right') {
      if (sox < tox) {
        let y = (soy + toy) / 2;
        if (sox < tx0) {
          if (y > tcy && y < ty1 + spacing) {
            y = ty0 - spacing;
          } else if (y <= tcy && y > ty0 - spacing) {
            y = ty1 + spacing;
          }
        }
        return [
          { x: sox, y: soy },
          { x: sox, y },
          { x: tox, y },
          { x: tox, y: toy },
        ];
      } else {
        const x = (sox + tox) / 2;
        return [
          { x, y: soy },
          { x, y: toy },
        ];
      }
    } else if (sourceSide === 'right' && targetSide === 'left') {
      // Right to left
      if (sox > tox) {
        let y = (soy + toy) / 2;
        if (sox > tx1) {
          if (y > tcy && y < ty1 + spacing) {
            y = ty0 - spacing;
          } else if (y <= tcy && y > ty0 - spacing) {
            y = ty1 + spacing;
          }
        }
        return [
          { x: sox, y: soy },
          { x: sox, y },
          { x: tox, y },
          { x: tox, y: toy },
        ];
      } else {
        const x = (sox + tox) / 2;
        return [
          { x, y: soy },
          { x, y: toy },
        ];
      }
    } else if (sourceSide === 'top' && targetSide === 'bottom') {
      // analogical to let to right
      if (soy < toy) {
        let x = (sox + tox) / 2;
        if (soy < ty0) {
          if (x > tcx && x < tx1 + spacing) {
            x = tx0 - spacing;
          } else if (x <= tcx && x > tx0 - spacing) {
            x = tx1 + spacing;
          }
        }
        return [
          { x: sox, y: soy },
          { x, y: soy },
          { x, y: toy },
          { x: tox, y: toy },
        ];
      }
      const y = (soy + toy) / 2;
      return [
        { x: sox, y },
        { x: tox, y },
      ];
    } else if (sourceSide === 'bottom' && targetSide === 'top') {
      // analogical to right to left
      if (soy >= toy) {
        let x = (sox + tox) / 2;
        if (soy > ty1) {
          if (x > tcx && x < tx1 + spacing) {
            x = tx0 - spacing;
          } else if (x <= tcx && x > tx0 - spacing) {
            x = tx1 + spacing;
          }
        }
        return [
          { x: sox, y: soy },
          { x, y: soy },
          { x, y: toy },
          { x: tox, y: toy },
        ];
      }
      const y = (soy + toy) / 2;
      return [
        { x: sox, y },
        { x: tox, y },
      ];
    } else if (sourceSide === 'top' && targetSide === 'top') {
      const y = Math.min(soy, toy);
      return [
        { x: sox, y },
        { x: tox, y },
      ];
    } else if (sourceSide === 'bottom' && targetSide === 'bottom') {
      const y = Math.max(soy, toy);
      return [
        { x: sox, y },
        { x: tox, y },
      ];
    } else if (sourceSide === 'left' && targetSide === 'left') {
      const x = Math.min(sox, tox);
      return [
        { x, y: soy },
        { x, y: toy },
      ];
    } else if (sourceSide === 'right' && targetSide === 'right') {
      const x = Math.max(sox, tox);
      return [
        { x, y: soy },
        { x, y: toy },
      ];
    } else if (sourceSide === 'top' && targetSide === 'right') {
      if (soy > toy) {
        if (sox < tox) {
          let y = (sy0 + toy) / 2;
          if (y > tcy && y < ty1 + spacing && sox < tx0 - spacing) {
            y = ty0 - spacing;
          }
          return [
            { x: sox, y },
            { x: tox, y },
            { x: tox, y: toy },
          ];
        }
        return [{ x: sox, y: toy }];
      }
      const x = (sx0 + tox) / 2;
      if (x > sx0 - spacing && soy < ty1) {
        const y = Math.min(sy0, ty0) - spacing;
        const x = Math.max(sx1, tx1) + spacing;
        return [
          { x: sox, y },
          { x, y },
          { x, y: toy },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: x, y: soy },
        { x: x, y: toy },
      ];
    } else if (sourceSide === 'top' && targetSide === 'left') {
      if (soy > toy) {
        if (sox > tox) {
          let y = (sy0 + toy) / 2;
          if (y > tcy && y < ty1 + spacing && sox > tx1 + spacing) {
            y = ty0 - spacing;
          }
          return [
            { x: sox, y },
            { x: tox, y },
            { x: tox, y: toy },
          ];
        }
        return [{ x: sox, y: toy }];
      }
      const x = (sx1 + tox) / 2;
      if (x < sx1 + spacing && soy < ty1) {
        const y = Math.min(sy0, ty0) - spacing;
        const x = Math.min(sx0, tx0) - spacing;
        return [
          { x: sox, y },
          { x, y },
          { x, y: toy },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: x, y: soy },
        { x: x, y: toy },
      ];
    } else if (sourceSide === 'bottom' && targetSide === 'right') {
      if (soy < toy) {
        if (sox < tox) {
          let y = (sy1 + ty0) / 2;
          if (y < tcy && y > ty0 - spacing && sox < tx0 - spacing) {
            y = ty1 + spacing;
          }
          return [
            { x: sox, y },
            { x: tox, y },
            { x: tox, y: toy },
          ];
        }
        return [
          { x: sox, y: soy },
          { x: sox, y: toy },
          { x: tox, y: toy },
        ];
      }
      const x = (sx0 + tox) / 2;
      if (x > sx0 - spacing && sy1 > toy) {
        const y = Math.max(sy1, ty1) + spacing;
        const x = Math.max(sx1, tx1) + spacing;
        return [
          { x: sox, y },
          { x, y },
          { x, y: toy },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: x, y: soy },
        { x: x, y: toy },
        { x: tox, y: toy },
      ];
    } else if (sourceSide === 'bottom' && targetSide === 'left') {
      if (soy < toy) {
        if (sox > tox) {
          let y = (sy1 + ty0) / 2;
          if (y < tcy && y > ty0 - spacing && sox > tx1 + spacing) {
            y = ty1 + spacing;
          }
          return [
            { x: sox, y },
            { x: tox, y },
            { x: tox, y: toy },
          ];
        }
        return [
          { x: sox, y: soy },
          { x: sox, y: toy },
          { x: tox, y: toy },
        ];
      }
      const x = (sx1 + tox) / 2;
      if (x < sx1 + spacing && sy1 > toy) {
        const y = Math.max(sy1, ty1) + spacing;
        const x = Math.min(sx0, tx0) - spacing;
        return [
          { x: sox, y },
          { x, y },
          { x, y: toy },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: x, y: soy },
        { x: x, y: toy },
        { x: tox, y: toy },
      ];
    } else if (sourceSide === 'left' && targetSide === 'bottom') {
      if (sox > tox) {
        if (soy < toy) {
          let x = (sx0 + tx1) / 2;
          if (x > tcx && x < tx1 + spacing && soy < ty0 - spacing) {
            x = Math.max(sx1, tx1) + spacing;
          }
          return [
            { x, y: soy },
            { x, y: toy },
            { x: tox, y: toy },
          ];
        }
        return [{ x: tox, y: soy }];
      }
      const y = (sy0 + ty1) / 2;
      if (y > sy0 - spacing) {
        const x = Math.min(sx0, tx0) - spacing;
        const y = Math.max(sy1, ty1) + spacing;
        return [
          { x, y: soy },
          { x, y },
          { x: tox, y },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: sox, y: y },
        { x: tox, y },
        { x: tox, y: toy },
      ];
    } else if (sourceSide === 'left' && targetSide === 'top') {
      // Analogy to the left - bottom case.
      if (sox > tox) {
        if (soy > toy) {
          let x = (sx0 + tx1) / 2;
          if (x > tcx && x < tx1 + spacing && soy > ty1 + spacing) {
            x = Math.max(sx1, tx1) + spacing;
          }
          return [
            { x, y: soy },
            { x, y: toy },
            { x: tox, y: toy },
          ];
        }
        return [{ x: tox, y: soy }];
      }
      const y = (sy1 + ty0) / 2;
      if (y < sy1 + spacing) {
        const x = Math.min(sx0, tx0) - spacing;
        const y = Math.min(sy0, ty0) - spacing;
        return [
          { x, y: soy },
          { x, y },
          { x: tox, y },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: sox, y: y },
        { x: tox, y },
        { x: tox, y: toy },
      ];
    } else if (sourceSide === 'right' && targetSide === 'top') {
      // Analogy to the right - bottom case.
      if (sox < tox) {
        if (soy > toy) {
          let x = (sx1 + tx0) / 2;
          if (x < tcx && x > tx0 - spacing && soy > ty1 + spacing) {
            x = Math.max(sx1, tx1) + spacing;
          }
          return [
            { x, y: soy },
            { x, y: toy },
            { x: tox, y: toy },
          ];
        }
        return [{ x: tox, y: soy }];
      }
      const y = (sy1 + ty0) / 2;
      if (y < sy1 + spacing) {
        const x = Math.max(sx1, tx1) + spacing;
        const y = Math.min(sy0, ty0) - spacing;
        return [
          { x, y: soy },
          { x, y },
          { x: tox, y },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: sox, y: y },
        { x: tox, y },
        { x: tox, y: toy },
      ];
    } else if (sourceSide === 'right' && targetSide === 'bottom') {
      // Analogy to the right - top case.
      if (sox < tox) {
        if (soy < toy) {
          let x = (sx1 + tx0) / 2;
          if (x < tcx && x > tx0 - spacing && soy < ty0 - spacing) {
            x = Math.min(sx0, tx0) - spacing;
          }
          return [
            { x, y: soy },
            { x, y: toy },
            { x: tox, y: toy },
          ];
        }
        return [
          { x: sox, y: soy },
          { x: tox, y: soy },
          { x: tox, y: toy },
        ];
      }
      const y = (sy0 + ty1) / 2;
      if (y > sy0 - spacing) {
        const x = Math.max(sx1, tx1) + spacing;
        const y = Math.max(sy1, ty1) + spacing;
        return [
          { x, y: soy },
          { x, y },
          { x: tox, y },
        ];
      }
      return [
        { x: sox, y: soy },
        { x: sox, y: y },
        { x: tox, y },
        { x: tox, y: toy },
      ];
    }

    return [];
  }
}
