###
#============================================================
#
# Generic Utilities
#
# @author Matthew Wagerfield @mwagerfield
#
#============================================================
###

class Utils

  ###
  # Generates a GUID.
  # @param {number} length The length of the guid.
  # @param {string} prefix String to prefix the GUID with.
  # @return {string} The generated GUID.
  ###
  @guid = (length = 8, prefix = 'mw') ->
    guid = ((Math.random().toFixed 1).substr 2 for i in [0...length])
    guid = "#{prefix}#{guid.join ''}"
    return guid
