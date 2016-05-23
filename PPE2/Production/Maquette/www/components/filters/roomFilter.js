export default function() {
  return function(input) {
    if(input === 'amphitheater')
        return 'Amphithéâtre';
    if(input === 'meeting')
        return 'Salle de réunion';
    if(input === 'friendly')
        return 'Salle conviviale';
    return input;
  };
};