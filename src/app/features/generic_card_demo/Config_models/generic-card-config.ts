import { GenericCardConfig } from "generic-components-angular";

export const genericCardDemoConfig: GenericCardConfig = {
  metaData: {
    id: 'demo-001',
    name: 'Demo Card',
    ariaLabel: 'Demo Interactive Card',
    loader: { show: false },
    errorHandler: { hasError: false },
  },
  theme: {
    customClass: 'demo-theme',
    style: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e9eefa 100%)',
      boxShadow: '0 8px 32px rgba(60, 75, 100, 0.17), 0 2px 4px rgba(60,75,100,0.07)',
      borderRadius: '16px',
      padding: '0',
    },
    primaryColor: '#4f86ff',
    secondaryColor: '#2460c4',
    textColor: '#222',
    borderColor: '#4f86ff',
    borderWidth: '2px',
  },
  structure: {
    layout: 'vertical',
    slots: {
      header: {
        content: {
          type: 'text',
          label: 'Welcome to the Demo Card!',
          data: 'Enjoy interactive features.',
          animation: { classes: 'fade-in' }
        },
        theme: { customClass: 'demo-header' }
      },
      body: {
        content: {
          type: 'list',
          label: 'Features',
          data: [
            'Expandable section',
            'Selectable card',
            'Draggable',
            'Overlay and error handling',
            'Custom themes'
          ],
          animation: { classes: 'slide-in' }
        },
        theme: { customClass: 'demo-body' }
      },
      footer: {
        content: {
          type: 'text',
          label: 'Actions:',
          data: 'Select, Expand, Drag this card!',
          animation: { classes: 'fade-in' }
        },
        theme: { customClass: 'demo-footer' }
      }
    }
  },
  behaviour: {
    expandable: true,
    expanded: false,
    selectable: true,
    selected: false,
    draggable: true,
    events: {
      onClick: (e: Event) => alert('Card clicked!'),
      onExpand: () => alert('Card expanded!'),
      onCollapse: () => alert('Card collapsed!'),
      onSelect: () => alert('Card selected!'),
      onDeselect: () => alert('Card deselected!'),
      onDragStart: () => alert('Drag started!'),
      onDragEnd: () => alert('Drag ended!'),
    },
  },
};