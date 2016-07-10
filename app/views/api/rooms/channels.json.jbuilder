json.array! @channels do |channel|
  json.label channel.title
  json.value channel.id
end
