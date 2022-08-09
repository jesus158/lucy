import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeMessage } from 'layouts/MessagesActions';
import { SnackbarProvider, withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';


class Message extends React.Component {

  render() {
    const { messages } = this.props.messagesState;
    messages.forEach(message => {
      const keySnackbar = this.props.enqueueSnackbar(message.message
        , {
          variant: message.variant
          , preventDuplicate: true
          , action: (
            <IconButton
              onClick={() => {
                this.props.removeMessage(message);
                this.props.closeSnackbar(keySnackbar);
              }}
              aria-label="Delete">
              <DeleteIcon
                fontSize="small"
                style={{ color: 'white' }}
              />
            </IconButton>)
          , onClickAction: () => {
            this.props.removeMessage(message);
            this.props.closeSnackbar(keySnackbar);
          }
          , onClose: () => {
            this.props.removeMessage(message);
            // this.props.closeSnackbar(keySnackbar); -> Causes Error
          }
        });
    });

    return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}

Message.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    messagesState: state.messagesState,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeMessage: message => dispatch(removeMessage(message)),
  };
};

//Conectar con el estado de los mensajes y habilitar para manejar Snackbar
const MessageApp = connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Message));

class IntegrationNotistack extends React.Component {

  render() {
    return (
      <SnackbarProvider maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>

        <MessageApp />
      </SnackbarProvider>
    );
  }
}

export default IntegrationNotistack;