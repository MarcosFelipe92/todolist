package com.marcos.todolist.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.marcos.todolist.dtos.user.UserDto;
import com.marcos.todolist.exceptions.user.EmailAlreadyExistsException;
import com.marcos.todolist.exceptions.user.UserNotFoundException;
import com.marcos.todolist.mappers.UserMapper;
import com.marcos.todolist.models.User;
import com.marcos.todolist.repositories.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    private static final Long ID = 1L;
    private static final String USERNAME = "John Doe";
    private static final String EMAIL = "johndoe@example.com";
    private static final String PASSWORD = "password123";
    private static final String ENCODED_PASSWORD = "encoded123";

    private static final String EXCEPTION_MESSAGE_USER_NOT_FOUND = "Usuário não encontrado.";
    private static final String EXCEPTION_MESSAGE_CREATE = "Já existe um Usuário com esse E-mail.";

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserRepository userRepository;

    @Mock
    private User mockUser;

    @InjectMocks
    private UserService userService;

    @Captor
    private ArgumentCaptor<User> userArgumentCaptor;

    @Nested
    class FindAll {

        @Test
        void shouldReturnListOfUserDto_whenFindAllIsInvoked() {
            // Arrange
            when(mockUser.getId()).thenReturn(ID);
            when(mockUser.getUsername()).thenReturn(USERNAME);
            when(mockUser.getEmail()).thenReturn(EMAIL);
            when(mockUser.getPassword()).thenReturn(PASSWORD);

            when(userRepository.findAll()).thenReturn(List.of(mockUser));

            // Act
            List<UserDto> output = userService.findAll();

            // Assert
            assertEquals(ID, output.get(0).getId());
            assertEquals(USERNAME, output.get(0).getUsername());
            assertEquals(EMAIL, output.get(0).getEmail());
            assertEquals(PASSWORD, output.get(0).getPassword());
        }
    }

    @Nested
    class findById {

        @Test
        void shouldReturnUserDto_whenUserExistsForGivenId() {
            // Arrange
            setupMockUser();

            when(userRepository.findById(anyLong())).thenReturn(Optional.of(mockUser));

            // Act
            UserDto output = userService.findById(ID);

            // Assert
            assertEquals(ID, output.getId());
            assertEquals(USERNAME, output.getUsername());
            assertEquals(EMAIL, output.getEmail());
            assertEquals(PASSWORD, output.getPassword());
        }

        @Test
        void shouldThrowUserUserNotFound_whenUserDoesNotExistForGivenId() {
            // Arrange
            when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

            // Act and Assert
            UserNotFoundException exception = assertThrows(UserNotFoundException.class,
                    () -> userService.findById(ID));

            assertEquals(EXCEPTION_MESSAGE_USER_NOT_FOUND, exception.getMessage());
        }
    }

    @Nested
    class Create {

        @Test
        void shouldSaveUserWithEncodedPasswordAndReturnDto_whenCreatingWithValidDataAndUniqueEmail() {
            setupMockUser();

            when(userRepository.save(userArgumentCaptor.capture())).thenReturn(mockUser);
            when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
            when(passwordEncoder.encode(PASSWORD)).thenReturn(ENCODED_PASSWORD);

            UserDto input = UserMapper.entityToDto(mockUser);

            UserDto output = userService.create(input);
            User userCaptured = userArgumentCaptor.getValue();

            verify(userRepository, times(1)).save(userArgumentCaptor.capture());
            assertNotNull(output);
            assertEquals(ENCODED_PASSWORD, userCaptured.getPassword());
        }

        @Test
        void shouldThrowEmailAlreadyExistsException_whenCreatingUserWithExistingEmail() {
            // Arrange
            when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(mockUser));

            UserDto input = new UserDto(ID, USERNAME, EMAIL, PASSWORD);

            // Act and Assert
            EmailAlreadyExistsException exception = assertThrows(EmailAlreadyExistsException.class,
                    () -> userService.create(input));

            assertEquals(EXCEPTION_MESSAGE_CREATE, exception.getMessage());
        }
    }

    @Nested
    class Update {

        @Test
        void shouldUpdateUserWithEncodedPasswordAndReturnDto_whenUserExistsForGivenId() {
            User realUser = new User(ID, USERNAME, EMAIL, PASSWORD);

            when(userRepository.save(userArgumentCaptor.capture())).thenReturn(realUser);
            when(userRepository.findById(ID)).thenReturn(Optional.of(realUser));
            when(passwordEncoder.encode(PASSWORD)).thenReturn(ENCODED_PASSWORD);

            UserDto input = UserMapper.entityToDto(realUser);

            UserDto output = userService.update(ID, input);
            User userCaptured = userArgumentCaptor.getValue();

            verify(userRepository, times(1)).save(userArgumentCaptor.capture());
            assertNotNull(output);
            assertEquals(ENCODED_PASSWORD, userCaptured.getPassword());
        }

        @Test
        void shouldThrowUserUserNotFound_whenUpdatingNonExistentUser() {
            // Arrange
            when(userRepository.findById(ID)).thenReturn(Optional.empty());

            UserDto input = new UserDto(ID, USERNAME, EMAIL, PASSWORD);

            // Act and Assert
            UserNotFoundException exception = assertThrows(UserNotFoundException.class,
                    () -> userService.update(ID, input));

            assertEquals(EXCEPTION_MESSAGE_USER_NOT_FOUND, exception.getMessage());
        }
    }

    @Nested
    class Delete {

        @Test
        void shouldCallRepositoryDeleteById_whenUserExistsForGivenId() {
            // Arrange
            when(userRepository.findById(anyLong())).thenReturn(Optional.of(mockUser));

            // Act
            userService.delete(ID);

            // Assert
            verify(userRepository, times(1)).deleteById(ID);
        }

        @Test
        void shouldThrowUserUserNotFound_whenDeletingNonExistentUser() {
            // Arrange
            when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

            // Act and Assert
            UserNotFoundException exception = assertThrows(UserNotFoundException.class,
                    () -> userService.delete(ID));

            assertEquals(EXCEPTION_MESSAGE_USER_NOT_FOUND, exception.getMessage());
        }
    }

    private void setupMockUser() {
        when(mockUser.getId()).thenReturn(ID);
        when(mockUser.getUsername()).thenReturn(USERNAME);
        when(mockUser.getEmail()).thenReturn(EMAIL);
        when(mockUser.getPassword()).thenReturn(PASSWORD);
    }
}
